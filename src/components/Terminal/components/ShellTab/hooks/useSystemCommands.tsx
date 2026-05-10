import React from 'react';
import type { ArticleMeta } from '@/components/Terminal/types';
import { HOME_FILES, HOME_DIRS, PROCESS_DATA } from '@/components/Terminal/constants';

export const buildSystemCommands = (
  articles: ArticleMeta[],
  cwd: string,
): Record<string, () => React.ReactNode> => ({
  help: () => (
    <div className="command-output">
      <p className="text-highlight">Available commands:</p>
      <div className="command-list">
        {['about', 'experience', 'education', 'skills', 'contact', 'projects', 'blog', 'cd blog', 'cd ..', 'ls', 'cat <file>', 'clear', 'whoami', 'ps', 'banner', '?'].map((cmd) => (
          <div key={cmd}><span className="text-command">{cmd}</span></div>
        ))}
      </div>
    </div>
  ),
  ls: () => {
    if (cwd === '~/blog') {
      if (articles.length === 0) return <div className="command-output"><p className="text-muted-term">No articles found.</p></div>;
      return (
        <div className="command-output">
          <div className="ls-output">
            {articles.map((a) => <span key={a.slug} className="text-link">{a.slug}.md</span>)}
          </div>
        </div>
      );
    }
    return (
      <div className="command-output">
        <div className="ls-output">
          {HOME_FILES.map((f) => <span key={f} className="text-link">{f}</span>)}
          {HOME_DIRS.map((d) => <span key={d} className="text-command">{d}/</span>)}
        </div>
      </div>
    );
  },
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
      <p className="text-normal">/home/theodoros/portfolio{cwd === '~/blog' ? '/blog' : ''}</p>
    </div>
  ),
  date: () => (
    <div className="command-output"><p className="text-normal">{new Date().toString()}</p></div>
  ),
  echo: () => (
    <div className="command-output"><p className="text-muted-term">Usage: echo is not implemented yet. But I hear you! 📢</p></div>
  ),
  ps: () => {
    const now = new Date();
    const birth = new Date('1995-02-07');
    const uptimeDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const uptimeStr = `${Math.floor(uptimeDays / 365)}y ${uptimeDays % 365}d`;
    const formatTime = (start: string) => {
      const d = Math.floor((now.getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24));
      const y = Math.floor(d / 365);
      return y > 0 ? `${y}y ${d % 365}d` : `${d}d`;
    };
    const headers: { label: string; cls: string }[] = [
      { label: 'PID', cls: 'ps-pid' }, { label: 'USER', cls: 'ps-user' }, { label: 'TIME', cls: 'ps-time' },
      { label: '%CPU', cls: 'ps-cpu' }, { label: '%MEM', cls: 'ps-mem' }, { label: 'STAT', cls: 'ps-stat' }, { label: 'COMMAND', cls: 'ps-cmd' },
    ];
    return (
      <div className="command-output">
        <div className="ps-output">
          <div className="ps-header">
            {headers.map(({ label, cls }) => <span key={label} className={`ps-col ${cls}`}>{label}</span>)}
          </div>
          {PROCESS_DATA.map((p) => (
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
          Uptime: <span className="text-string">{uptimeStr}</span> | Processes: <span className="text-string">{PROCESS_DATA.length}</span> | Load avg: <span className="text-string">∞ ∞ ∞</span>
        </p>
      </div>
    );
  },
});
