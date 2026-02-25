import React, { useCallback } from 'react';
import type { ArticleMeta } from './types';

const experience = [
  {
    title: 'Full Stack Software Engineer',
    org: 'Behavioral Signals',
    location: 'Greece',
    date: 'March 2024 - Present',
    tech: ['ReactJS', 'FastAPI', 'Django', 'AI/ML'],
  },
  {
    title: 'Machine Learning Engineer',
    org: 'NCSR Demokritos',
    location: 'Ayia Paraskevi, Greece',
    date: 'Dec 2022 - Feb 2024',
    tech: ['Deep Learning', 'Faiss', 'ReactJS', 'FastAPI', 'Docker'],
  },
  {
    title: 'Full Stack Software Engineer',
    org: 'Optechain',
    location: 'Argyroupoli, Greece',
    date: 'Oct 2020 - Feb 2024',
    tech: ['ReactJS', 'React Native', 'Angular', 'NodeJS', 'C#'],
  },
];

const education = [
  {
    degree: 'PhD Candidate in Computer Science',
    school: 'University of Thessaly',
    location: 'Lamia, Greece',
    date: '2021 - Present',
    thesis: undefined as string | undefined,
  },
  {
    degree: 'MSc in Data Science',
    school: 'University of Peloponnese',
    location: 'Lamia, Greece',
    date: '2019 - 2021',
    thesis: 'Multimodal summarization of user-generated videos from wearable cameras',
  },
  {
    degree: 'BSc in Computer Science',
    school: 'University of Thessaly',
    location: 'Lamia, Greece',
    date: '2013 - 2018',
    thesis: undefined as string | undefined,
  },
];

const skills = {
  languages: ['Python', 'TypeScript', 'JavaScript', 'C'],
  frameworks: ['ReactJS', 'Angular', 'Flask', 'Django', 'NodeJS'],
  ml: ['scikit-learn', 'PyTorch', 'Keras', 'TensorFlow'],
  databases: ['MySQL/MariaDB', 'PostgreSQL', 'MSSQL', 'MongoDB'],
  tools: ['Git', 'Docker'],
};

export const COMMAND_DESCRIPTIONS: Record<string, string> = {
  about: 'Display information about me',
  experience: 'Show work experience',
  education: 'Show educational background',
  skills: 'List technical skills',
  contact: 'Get contact information',
  projects: 'View GitHub projects',
  blog: 'List / open blog articles',
  clear: 'Clear terminal screen',
  whoami: 'Display current user',
  ls: 'List available commands',
  banner: 'Display welcome banner',
  pwd: 'Print working directory',
  date: 'Display current date',
  echo: 'Echo text',
  sudo: 'Run as superuser',
  exit: 'Exit terminal',
  ps: 'Show running processes',
  '?': 'Show help (alias for help)',
};

const renderTreeFields = (
  fields: { key: string; val: string }[],
  childPipe: string,
) => {
  return fields.map((f, i) => {
    const isLast = i === fields.length - 1;
    const branch = isLast ? '└── ' : '├── ';
    return (
      <div key={f.key} className="cmd-tree-row cmd-tree-child">
        <span className="cmd-tree-branch">{childPipe}{branch}</span>
        <span className="cmd-tree-key">{f.key}: </span>
        <span className="cmd-tree-val">{f.val}</span>
      </div>
    );
  });
};

export const useCommands = (
  articles: ArticleMeta[],
  onOpenArticle: (slug: string, title: string) => void,
) => {
  const handleBlogCommand = useCallback((args: string): React.ReactNode => {
    const slug = args.trim();

    if (!slug) {
      if (articles.length === 0) {
        return (
          <div className="command-output">
            <p className="text-muted-term">No articles found. Check back later!</p>
          </div>
        );
      }
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
    if (!article) {
      return (
        <div className="command-output">
          <p className="text-error">Article not found: {slug}</p>
          <p className="text-muted-term">
            Type <span className="text-command">blog</span> to see available articles.
          </p>
        </div>
      );
    }

    onOpenArticle(article.slug, article.title);
    return (
      <div className="command-output">
        <p className="text-muted-term">
          Opening <span className="text-command">{article.title}</span> in a new tab...
        </p>
      </div>
    );
  }, [articles, onOpenArticle]);

  const commands: Record<string, () => React.ReactNode> = {
    help: () => (
      <div className="command-output">
        <p className="text-highlight">Available commands:</p>
        <div className="command-list">
          <div><span className="text-command">about</span> <span className="text-muted-term">- Display information about me</span></div>
          <div><span className="text-command">experience</span> <span className="text-muted-term">- Show work experience</span></div>
          <div><span className="text-command">education</span> <span className="text-muted-term">- Show educational background</span></div>
          <div><span className="text-command">skills</span> <span className="text-muted-term">- List technical skills</span></div>
          <div><span className="text-command">contact</span> <span className="text-muted-term">- Get contact information</span></div>
          <div><span className="text-command">projects</span> <span className="text-muted-term">- View GitHub projects</span></div>
          <div><span className="text-command">blog</span> <span className="text-muted-term">- List blog articles</span></div>
          <div><span className="text-command">blog &lt;slug&gt;</span> <span className="text-muted-term">- Open an article in a new tab</span></div>
          <div><span className="text-command">clear</span> <span className="text-muted-term">- Clear terminal screen</span></div>
          <div><span className="text-command">whoami</span> <span className="text-muted-term">- Display current user</span></div>
          <div><span className="text-command">ls</span> <span className="text-muted-term">- List available commands</span></div>
          <div><span className="text-command">ps</span> <span className="text-muted-term">- Show running processes</span></div>
          <div><span className="text-command">banner</span> <span className="text-muted-term">- Display welcome banner</span></div>
          <div><span className="text-command">?</span> <span className="text-muted-term">- Show this help</span></div>
        </div>
      </div>
    ),
    ls: () => (
      <div className="command-output">
        <div className="ls-output">
          <span className="text-command">about</span>
          <span className="text-command">experience</span>
          <span className="text-command">education</span>
          <span className="text-command">skills</span>
          <span className="text-command">contact</span>
          <span className="text-command">projects</span>
          <span className="text-command">blog</span>
          <span className="text-command">ps</span>
          <span className="text-command">help</span>
          <span className="text-command">clear</span>
        </div>
      </div>
    ),
    about: () => (
      <div className="command-output">
        <p className="text-highlight">Theodoros Psallidas</p>
        <p className="text-normal">Senior Software Engineer & AI Engineer</p>
        <p className="text-muted-term">
          Passionate about audiovisual data analysis and machine learning, specializing
          in multimodal video summarization. Currently building AI-driven voice and emotion
          recognition technologies at Behavioral Signals.
        </p>
        <br />
        <p className="text-normal">📍 Athens, Greece</p>
        <p className="text-normal">🎓 PhD Candidate — Video Summarization @ University of Thessaly</p>
        <p className="text-normal">💼 Full Stack Development, Machine Learning, Audio Processing</p>
        <p className="text-normal">🏆 Winner — Code the IoT Hackathon (MaTHiSiS Project)</p>
        <p className="text-normal">🍺 Craft beer enthusiast</p>
        <p className="text-normal">🐕 Pair programming with Barney (my dog)</p>
      </div>
    ),
    whoami: () => (
      <div className="command-output">
        <p className="text-command">theodoros@portfolio ~ %</p>
      </div>
    ),
    experience: () => (
      <div className="command-output">
        <div className="cmd-tree">
          <div className="cmd-tree-header">
            <span className="cmd-tree-icon">💼</span>
            <span className="cmd-tree-label">Work Experience</span>
          </div>
          {experience.map((exp, idx) => {
            const isLast = idx === experience.length - 1;
            const branch = isLast ? '└── ' : '├── ';
            const pipe = isLast ? '    ' : '│   ';
            return (
              <div key={idx} className="cmd-tree-group">
                <div className="cmd-tree-row">
                  <span className="cmd-tree-branch">{branch}</span>
                  <span className="cmd-tree-title">{exp.title}</span>
                </div>
                {renderTreeFields([
                  { key: 'Org', val: exp.org },
                  { key: 'Location', val: exp.location },
                  { key: 'Period', val: exp.date },
                  { key: 'Tech', val: exp.tech.join(', ') },
                ], pipe)}
              </div>
            );
          })}
        </div>
      </div>
    ),
    education: () => (
      <div className="command-output">
        <div className="cmd-tree">
          <div className="cmd-tree-header">
            <span className="cmd-tree-icon">🎓</span>
            <span className="cmd-tree-label">Education</span>
          </div>
          {education.map((edu, idx) => {
            const isLast = idx === education.length - 1;
            const branch = isLast ? '└── ' : '├── ';
            const pipe = isLast ? '    ' : '│   ';
            const fields: { key: string; val: string }[] = [
              { key: 'School', val: edu.school },
              { key: 'Location', val: edu.location },
              { key: 'Period', val: edu.date },
            ];
            if (edu.thesis) fields.push({ key: 'Thesis', val: `"${edu.thesis}"` });
            return (
              <div key={idx} className="cmd-tree-group">
                <div className="cmd-tree-row">
                  <span className="cmd-tree-branch">{branch}</span>
                  <span className="cmd-tree-title">{edu.degree}</span>
                </div>
                {renderTreeFields(fields, pipe)}
              </div>
            );
          })}
        </div>
      </div>
    ),
    skills: () => (
      <div className="command-output">
        <p className="text-highlight">Technical Skills:</p>
        <div className="skills-grid">
          <div><p className="text-keyword">Languages:</p><p className="text-normal">{skills.languages.join(', ')}</p></div>
          <div><p className="text-keyword">Frameworks:</p><p className="text-normal">{skills.frameworks.join(', ')}</p></div>
          <div><p className="text-keyword">ML/AI:</p><p className="text-normal">{skills.ml.join(', ')}</p></div>
          <div><p className="text-keyword">Databases:</p><p className="text-normal">{skills.databases.join(', ')}</p></div>
          <div><p className="text-keyword">Tools:</p><p className="text-normal">{skills.tools.join(', ')}</p></div>
        </div>
      </div>
    ),
    contact: () => (
      <div className="command-output">
        <p className="text-highlight">Contact Information:</p>
        <div className="contact-links">
          <p><span className="text-keyword">GitHub:</span>{' '}<a href="https://github.com/theopsall" target="_blank" rel="noopener noreferrer" className="text-link">github.com/theopsall</a></p>
          <p><span className="text-keyword">LinkedIn:</span>{' '}<a href="https://www.linkedin.com/in/tpsallidas" target="_blank" rel="noopener noreferrer" className="text-link">linkedin.com/in/tpsallidas</a></p>
          <p><span className="text-keyword">Email:</span>{' '}<a href="mailto:theopsall@gmail.com" className="text-link">theopsall@gmail.com</a></p>
          <p><span className="text-keyword">Twitter:</span>{' '}<a href="https://twitter.com/TheoPsallidas" target="_blank" rel="noopener noreferrer" className="text-link">@TheoPsallidas</a></p>
          <p><span className="text-keyword">Google Scholar:</span>{' '}<a href="https://scholar.google.com/citations?user=theopsall" target="_blank" rel="noopener noreferrer" className="text-link">View Publications</a></p>
        </div>
      </div>
    ),
    projects: () => (
      <div className="command-output">
        <div className="cmd-tree">
          <div className="cmd-tree-header">
            <span className="cmd-tree-icon">📦</span>
            <span className="cmd-tree-label">Pinned Repositories</span>
          </div>
          {[
            { name: 'Video-Summarization', desc: 'Multimodal video summarization from wearable cameras' },
            { name: 'whisper_wrapper', desc: 'Speech recognition wrapper for OpenAI Whisper' },
            { name: 'multiSmote', desc: 'Multi-label SMOTE implementation for imbalanced datasets' },
            { name: 'video_annotator', desc: 'Web-based video annotation tool' },
            { name: 'deep_video_extraction', desc: 'Deep feature extraction from video' },
          ].map((repo, idx, arr) => {
            const isLast = idx === arr.length - 1;
            const branch = isLast ? '└── ' : '├── ';
            return (
              <div key={repo.name} className="cmd-tree-row">
                <span className="cmd-tree-branch">{branch}</span>
                <a href={`https://github.com/theopsall/${repo.name}`} target="_blank" rel="noopener noreferrer" className="text-link" style={{ fontWeight: 600 }}>{repo.name}</a>
                <span className="text-muted-term" style={{ marginLeft: '0.75rem' }}>{repo.desc}</span>
              </div>
            );
          })}
        </div>
        <p className="text-muted-term" style={{ marginTop: '0.75rem' }}>
          View all at <a href="https://github.com/theopsall?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-link">github.com/theopsall</a>
        </p>
      </div>
    ),
    sudo: () => (
      <div className="command-output">
        <p className="text-error">Nice try! 😄</p>
        <p className="text-muted-term">theodoros is not in the sudoers file. This incident will be reported.</p>
      </div>
    ),
    exit: () => (
      <div className="command-output">
        <p className="text-muted-term">Thanks for visiting! 👋</p>
        <p className="text-normal">But you can't actually exit... this is the web! 😉</p>
      </div>
    ),
    pwd: () => (
      <div className="command-output">
        <p className="text-normal">/home/theodoros/portfolio</p>
      </div>
    ),
    date: () => (
      <div className="command-output">
        <p className="text-normal">{new Date().toString()}</p>
      </div>
    ),
    echo: () => (
      <div className="command-output">
        <p className="text-muted-term">Usage: echo is not implemented yet. But I hear you! 📢</p>
      </div>
    ),
    ps: () => {
      const now = new Date();
      const birth = new Date('1995-02-07');
      const uptimeMs = now.getTime() - birth.getTime();
      const uptimeDays = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
      const uptimeYears = Math.floor(uptimeDays / 365);
      const remainDays = uptimeDays % 365;
      const uptimeStr = `${uptimeYears}y ${remainDays}d`;

      const formatTime = (startDate: string) => {
        const start = new Date(startDate);
        const ms = now.getTime() - start.getTime();
        const d = Math.floor(ms / (1000 * 60 * 60 * 24));
        const y = Math.floor(d / 365);
        const rd = d % 365;
        return y > 0 ? `${y}y ${rd}d` : `${rd}d`;
      };

      const processes = [
        { pid: 1, user: 'theopsall', start: '1995-02-07', cpu: '99.9', mem: '100.0', stat: 'R+', cmd: 'living --fullstack --ai' },
        { pid: 42, user: 'theopsall', start: '2013-09-01', cpu: '92.4', mem: '87.3', stat: 'R', cmd: 'coding --lang=python,ts,js,c' },
        { pid: 100, user: 'theopsall', start: '2021-01-01', cpu: '95.1', mem: '91.7', stat: 'R', cmd: 'phd --cs --university-of-thessaly' },
        { pid: 200, user: 'theopsall', start: '2024-03-01', cpu: '88.6', mem: '76.2', stat: 'R', cmd: 'work --org=behavioral-signals --role=senior-swe' },
        { pid: 301, user: 'theopsall', start: '2019-01-01', cpu: '78.3', mem: '68.5', stat: 'S', cmd: 'ml-research --pytorch --keras --faiss' },
        { pid: 404, user: 'theopsall', start: '2020-01-01', cpu: '45.2', mem: '32.1', stat: 'S', cmd: 'open-source --github=theopsall' },
        { pid: 512, user: 'barney', start: '2020-01-01', cpu: '100.0', mem: '99.9', stat: 'R+', cmd: 'pair-programming --with=theopsall --treats=yes' },
      ];

      return (
        <div className="command-output">
          <div className="ps-output">
            <div className="ps-header">
              <span className="ps-col ps-pid">PID</span>
              <span className="ps-col ps-user">USER</span>
              <span className="ps-col ps-time">TIME</span>
              <span className="ps-col ps-cpu">%CPU</span>
              <span className="ps-col ps-mem">%MEM</span>
              <span className="ps-col ps-stat">STAT</span>
              <span className="ps-col ps-cmd">COMMAND</span>
            </div>
            {processes.map((p) => (
              <div key={p.pid} className="ps-row">
                <span className="ps-col ps-pid">{p.pid}</span>
                <span className="ps-col ps-user">{p.user}</span>
                <span className="ps-col ps-time">{formatTime(p.start)}</span>
                <span className="ps-col ps-cpu">{p.cpu}</span>
                <span className="ps-col ps-mem">{p.mem}</span>
                <span className="ps-col ps-stat">{p.stat}</span>
                <span className="ps-col ps-cmd">{p.cmd}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-term" style={{ marginTop: '0.75rem' }}>
            Uptime: <span className="text-string">{uptimeStr}</span> | Processes: <span className="text-string">{processes.length}</span> | Load avg: <span className="text-string">∞ ∞ ∞</span>
          </p>
        </div>
      );
    },
    banner: () => (
      <div className="welcome-banner">
        <pre className="ascii-art">{`
╔════════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║  ████████╗██╗  ██╗███████╗ ██████╗ ██████╗  ██████╗ ██████╗  ██████╗ ███████╗  ║
║  ╚══██╔══╝██║  ██║██╔════╝██╔═══██╗██╔══██╗██╔═══██╗██╔══██╗██╔═══██╗██╔════╝  ║
║     ██║   ███████║█████╗  ██║   ██║██║  ██║██║   ██║██████╔╝██║   ██║███████╗  ║
║     ██║   ██╔══██║██╔══╝  ██║   ██║██║  ██║██║   ██║██╔══██╗██║   ██║╚════██║  ║
║     ██║   ██║  ██║███████╗╚██████╔╝██████╔╝╚██████╔╝██║  ██║╚██████╔╝███████║  ║
║     ╚═╝   ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝  ║
║                                                                                ║
║                      PSALLIDAS THEODOROS - PORTFOLIO v2.0                      ║
║                                                                                ║
╚════════════════════════════════════════════════════════════════════════════════╝
        `}</pre>
      </div>
    ),
  };

  const executeCommand = useCallback((cmd: string): { output: React.ReactNode } | 'clear' => {
    const trimmed = cmd.trim().toLowerCase();

    if (trimmed === 'clear') return 'clear';

    if (trimmed === '') return { output: null };

    if (trimmed === 'blog' || trimmed.startsWith('blog ')) {
      const args = trimmed === 'blog' ? '' : trimmed.slice(5);
      return { output: handleBlogCommand(args) };
    }

    if (trimmed === '?') return { output: commands['help']() };

    if (commands[trimmed]) return { output: commands[trimmed]() };

    return {
      output: (
        <div className="command-output">
          <p className="text-error">Command not found: {cmd}</p>
          <p className="text-muted-term">Type <span className="text-command">help</span> or <span className="text-command">?</span> to see available commands.</p>
        </div>
      ),
    };
  }, [handleBlogCommand]);

  const commandNames = [...new Set([...Object.keys(commands), 'blog', '?'])];

  return { executeCommand, commandNames };
};
