import React, { useCallback } from 'react';
import type { ArticleMeta } from '@/components/Terminal/types';
import { HOME_FILES, HOME_DIRS, FILE_TO_COMMAND } from '@/components/Terminal/constants';
import BlogCatOutput from '@/components/Terminal/components/BlogCatOutput';
import { buildInfoCommands } from './useCommandRegistry';
import { buildSystemCommands } from './useSystemCommands';

export const useCommands = (
  articles: ArticleMeta[],
  onOpenArticle: (slug: string, title: string) => void,
  cwd: string,
  fetchArticle: (slug: string) => Promise<string>,
) => {
  const commands: Record<string, () => React.ReactNode> = {
    ...buildInfoCommands(),
    ...buildSystemCommands(articles, cwd),
  };

  const handleBlogCommand = useCallback((args: string): React.ReactNode => {
    const slug = args.trim();
    if (!slug) {
      if (articles.length === 0) return <div className="command-output"><p className="text-muted-term">No articles found. Check back later!</p></div>;
      return (
        <div className="command-output">
          <p className="text-highlight">Blog Articles:</p>
          <div className="command-list">
            {articles.map((article) => (
              <div key={article.slug}>
                <span className="text-command">{article.slug}</span>
                <span className="text-muted-term">— {article.title} ({article.date} · {article.readingTime})</span>
              </div>
            ))}
          </div>
          <p className="text-muted-term" style={{ marginTop: '1rem' }}>
            Usage: <span className="text-command">blog &lt;slug&gt;</span> to open an article in a new tab.
          </p>
        </div>
      );
    }
    const article = articles.find((a) => a.slug === slug);
    if (!article) return (
      <div className="command-output">
        <p className="text-error">Article not found: {slug}</p>
        <p className="text-muted-term">Type <span className="text-command">blog</span> to see available articles.</p>
      </div>
    );
    onOpenArticle(article.slug, article.title);
    return <div className="command-output"><p className="text-muted-term">Opening <span className="text-command">{article.title}</span> in a new tab…</p></div>;
  }, [articles, onOpenArticle]);

  const handleCatCommand = useCallback((file: string): React.ReactNode => {
    if (!file) return (
      <div className="command-output">
        <p className="text-error">cat: missing file operand</p>
        <p className="text-muted-term">Usage: <span className="text-command">cat &lt;file&gt;</span></p>
      </div>
    );
    if (file.startsWith('blog/')) return <BlogCatOutput slug={file.slice(5).replace(/\.md$/, '')} fetchArticle={fetchArticle} />;
    if (cwd === '~/blog') return <BlogCatOutput slug={file.replace(/\.md$/, '')} fetchArticle={fetchArticle} />;
    const mapped = FILE_TO_COMMAND[file.toLowerCase()];
    if (mapped) return commands[mapped]?.() ?? <div className="command-output"><p className="text-error">cat: {file}: No such file or directory</p></div>;
    return (
      <div className="command-output">
        <p className="text-error">cat: {file}: No such file or directory</p>
        <p className="text-muted-term">Available: {HOME_FILES.join('  ')}  {HOME_DIRS.map((d) => d + '/').join('  ')}</p>
      </div>
    );
  }, [cwd, fetchArticle, commands]);

  const executeCommand = useCallback((cmd: string): { output: React.ReactNode } | 'clear' | { cwd: string; output: React.ReactNode } => {
    const trimmed = cmd.trim().toLowerCase();
    const raw = cmd.trim();
    if (trimmed === 'clear') return 'clear';
    if (trimmed === '') return { output: null };
    if (trimmed === 'cd blog' || trimmed === 'cd ./blog') return { cwd: '~/blog', output: null };
    if (trimmed === 'cd' || trimmed === 'cd ~' || trimmed === 'cd /') return { cwd: '~', output: null };
    if (trimmed === 'cd ..' || trimmed === 'cd ../') {
      if (cwd === '~/blog') return { cwd: '~', output: null };
      return { output: <div className="command-output"><p className="text-muted-term">Already at home directory.</p></div> };
    }
    if (trimmed.startsWith('cd ')) return { output: <div className="command-output"><p className="text-error">cd: {trimmed.slice(3).trim()}: No such directory</p></div> };
    if (trimmed === 'blog' || trimmed.startsWith('blog ')) return { output: handleBlogCommand(trimmed === 'blog' ? '' : trimmed.slice(5)) };
    if (trimmed === 'cat' || trimmed.startsWith('cat ')) return { output: handleCatCommand(raw.slice(3).trim()) };
    if (trimmed === 'echo' || trimmed.startsWith('echo ')) return { output: <div className="command-output"><p className="text-normal">{raw.trim().slice(5)}</p></div> };
    if (trimmed === '?') return { output: commands['help']() };
    if (commands[trimmed]) return { output: commands[trimmed]() };
    return { output: <div className="command-output"><p className="text-error">Command not found: {cmd}</p><p className="text-muted-term">Type <span className="text-command">help</span> or <span className="text-command">?</span> to see available commands.</p></div> };
  }, [handleBlogCommand, handleCatCommand, cwd, commands]);

  const commandNames = [...new Set([...Object.keys(commands), 'blog', 'cd', '?'])];

  return { executeCommand, commandNames };
};
