#!/usr/bin/env bash
set -euo pipefail

# ── colour helpers ────────────────────────────────────────────────────────────
RED='\033[0;31m'; YELLOW='\033[1;33m'; GREEN='\033[0;32m'
CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

info()    { echo -e "${CYAN}[info]${RESET}  $*"; }
success() { echo -e "${GREEN}[ok]${RESET}    $*"; }
warn()    { echo -e "${YELLOW}[warn]${RESET}  $*"; }
die()     { echo -e "${RED}[error]${RESET} $*" >&2; exit 1; }

echo -e "\n${BOLD}Knowledge Graph Setup — graphify + code-review-graph${RESET}\n"

# ── step 1: preflight ─────────────────────────────────────────────────────────
info "Checking prerequisites..."

[[ -d ".git" ]] \
    || die "Run this script from the repo root (.git directory expected)."

# ── detect install method: prefer uv, fall back to pip/python ─────────────────
USE_UV=false
PYTHON_BIN=""
PIP_BIN=""

if command -v uv >/dev/null 2>&1; then
    USE_UV=true
    success "uv $(uv --version | awk '{print $2}') found — using uv tool install."
else
    warn "uv not found — falling back to pip/python."
    for py in python3 python; do
        if command -v "$py" >/dev/null 2>&1; then
            PYTHON_BIN="$py"
            break
        fi
    done
    [[ -n "$PYTHON_BIN" ]] \
        || die "Neither uv nor python found. Install uv (https://docs.astral.sh/uv/) or Python and re-run."

    for pip_cmd in pip3 pip; do
        if command -v "$pip_cmd" >/dev/null 2>&1; then
            PIP_BIN="$pip_cmd"
            break
        fi
    done
    [[ -n "$PIP_BIN" ]] \
        || die "pip not found. Install pip and re-run."

    success "$PYTHON_BIN / $PIP_BIN found."
fi

# Python for running helper scripts (JSON update etc.)
SCRIPT_PYTHON=""
for py in python3 python; do
    if command -v "$py" >/dev/null 2>&1; then
        SCRIPT_PYTHON="$py"
        break
    fi
done
[[ -n "$SCRIPT_PYTHON" ]] \
    || die "No Python interpreter found for helper scripts. Install Python and re-run."

# ── step 2: install CLIs ──────────────────────────────────────────────────────
if $USE_UV; then
    info "Installing graphifyy (with mcp extra) via uv..."
    uv tool install --with mcp graphifyy
    info "Installing code-review-graph via uv..."
    uv tool install code-review-graph
    # uv tool bins land in ~/.local/bin — ensure it is on PATH for this session
    if ! command -v graphify >/dev/null 2>&1; then
        export PATH="$HOME/.local/bin:$PATH"
    fi
else
    info "Installing graphifyy via pip..."
    $PIP_BIN install graphifyy
    info "Installing code-review-graph via pip..."
    $PIP_BIN install code-review-graph
fi

command -v graphify >/dev/null 2>&1 \
    || die "'graphify' not found after install. Ensure its bin dir is on your PATH and re-run."
command -v code-review-graph >/dev/null 2>&1 \
    || die "'code-review-graph' not found after install. Ensure its bin dir is on your PATH and re-run."

success "CLIs installed and on PATH."

# ── step 3: build code-review-graph ──────────────────────────────────────────
info "Building code-review-graph (Tree-sitter pass, no LLM cost)..."
code-review-graph build
success "code-review-graph built."

# ── step 4: update .mcp.json for the detected install method ─────────────────
# uv path  → command: "uv", args: ["tool", "run", "--from", "graphifyy", ...]
# pip path → command: "/abs/path/to/python", args: ["-m", "graphify.serve", ...]
info "Updating .mcp.json for $(if $USE_UV; then echo 'uv'; else echo 'pip/python'; fi) install..."

if $USE_UV; then
    MCP_GRAPHIFY_CMD="uv"
    MCP_GRAPHIFY_ARGS='["tool", "run", "--from", "graphifyy", "python", "-m", "graphify.serve", "graphify-out/graph.json"]'
else
    PYTHON_ABS=$($PYTHON_BIN -c "import sys; print(sys.executable)")
    MCP_GRAPHIFY_CMD="$PYTHON_ABS"
    MCP_GRAPHIFY_ARGS='["-m", "graphify.serve", "graphify-out/graph.json"]'
fi

MCP_GRAPHIFY_CMD="$MCP_GRAPHIFY_CMD" MCP_GRAPHIFY_ARGS="$MCP_GRAPHIFY_ARGS" \
    "$SCRIPT_PYTHON" - << 'PYEOF'
import json, os, pathlib

p = pathlib.Path('.mcp.json')
cfg = json.loads(p.read_text()) if p.exists() else {'mcpServers': {}}
cmd = os.environ['MCP_GRAPHIFY_CMD']
args = json.loads(os.environ['MCP_GRAPHIFY_ARGS'])
cfg.setdefault('mcpServers', {})
cfg['mcpServers']['graphify'] = {'command': cmd, 'args': args, 'type': 'stdio'}
p.write_text(json.dumps(cfg, indent=2) + '\n')
print(f"  graphify → command={cmd!r}")
PYEOF

success ".mcp.json updated."

# ── step 5: install graphify post-commit hook (idempotent) ───────────────────
HOOK_FILE=".git/hooks/post-commit"
info "Checking graphify post-commit hook..."
if grep -q "graphify-hook-start" "$HOOK_FILE" 2>/dev/null; then
    warn "graphify hook already present — skipping."
else
    graphify hook install
    success "graphify post-commit hook installed."
fi

# ── step 6: append code-review-graph snippet (idempotent) ────────────────────
# Guards against both the marker-wrapped form and the bare form already present
# in clones that ran the old manual setup.
info "Checking code-review-graph post-commit snippet..."
if grep -q "code-review-graph-hook-start\|code-review-graph update" "$HOOK_FILE" 2>/dev/null; then
    warn "code-review-graph snippet already present — skipping."
else
    cat >> "$HOOK_FILE" << 'HOOK'

# code-review-graph-hook-start
# code-review-graph: incremental update for MCP server
if command -v code-review-graph >/dev/null 2>&1; then
    code-review-graph update 2>/dev/null || true
fi
# code-review-graph-hook-end
HOOK
    chmod +x "$HOOK_FILE"
    success "code-review-graph snippet appended."
fi

# ── step 7: editor integration ────────────────────────────────────────────────
info "Running 'graphify claude install'..."
graphify claude install
success "Editor integration configured."

# ── step 8: verify ───────────────────────────────────────────────────────────
echo ""
info "Versions:"
echo "  graphify           $(graphify --version 2>/dev/null || echo 'unknown')"
echo "  code-review-graph  $(code-review-graph --version 2>/dev/null || echo 'unknown')"

info "Current .mcp.json graphify entry:"
"$SCRIPT_PYTHON" - << 'PYEOF'
import json, pathlib
cfg = json.loads(pathlib.Path('.mcp.json').read_text())
g = cfg['mcpServers']['graphify']
print(f"  command: {g['command']!r}")
print(f"  args:    {g['args']}")
PYEOF

if [[ -f "graphify-out/graph.json" ]]; then
    success "graphify-out/graph.json exists — graph is ready."
else
    warn "graphify-out/graph.json not found (expected — the LLM-backed graph is built in the next step)."
fi

# ── step 9: final instructions ────────────────────────────────────────────────
echo ""
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "${BOLD}  Two manual steps remain:${RESET}"
echo ""
echo -e "  ${CYAN}1.${RESET} Restart your editor so it picks up the MCP servers from .mcp.json."
echo ""
echo -e "  ${CYAN}2.${RESET} Open a Claude Code session in this repo and run:"
echo -e "       ${BOLD}/graphify .${RESET}"
echo -e "     This is the LLM-backed pass that builds graphify-out/ (graph JSON,"
echo -e "     HTML, wiki). It takes a few minutes and must run inside Claude Code."
echo ""
echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""
