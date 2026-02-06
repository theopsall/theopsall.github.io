import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import DarkVeil from '../DarkVeil';

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

const getWelcomeBanner = (): CommandHistory => ({
  command: '',
  output: (
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
      <div className="welcome-text">
        <p className="text-highlight">Welcome to my interactive terminal portfolio!</p>
        <p className="text-muted-term">Type <span className="text-command">help</span> to see available commands.</p>
      </div>
    </div>
  )
});

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory([getWelcomeBanner()]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const experience = [
    {
      title: "Full Stack Software Engineer",
      org: "Behavioral Signals",
      location: "Greece",
      date: "March 2024 - Present",
      tech: ["ReactJS", "FastAPI", "Django", "AI/ML"]
    },
    {
      title: "Machine Learning Engineer",
      org: "NCSR Demokritos",
      location: "Ayia Paraskevi, Greece",
      date: "Dec 2022 - Feb 2024",
      tech: ["Deep Learning", "Faiss", "ReactJS", "FastAPI", "Docker"]
    },
    {
      title: "Full Stack Software Engineer",
      org: "Optechain",
      location: "Argyroupoli, Greece",
      date: "Oct 2020 - Feb 2024",
      tech: ["ReactJS", "React Native", "Angular", "NodeJS", "C#"]
    }
  ];

  const education = [
    {
      degree: "PhD Candidate in Computer Science",
      school: "University of Thessaly",
      location: "Lamia, Greece",
      date: "2021 - Present"
    },
    {
      degree: "MSc in Data Science",
      school: "University of Peloponnese",
      location: "Lamia, Greece",
      date: "2019 - 2021",
      thesis: "Multimodal summarization of user-generated videos from wearable cameras"
    },
    {
      degree: "BSc in Computer Science",
      school: "University of Thessaly",
      location: "Lamia, Greece",
      date: "2013 - 2018"
    }
  ];

  const skills = {
    languages: ["Python", "TypeScript", "JavaScript", "C"],
    frameworks: ["ReactJS", "Angular", "Flask", "Django", "NodeJS"],
    ml: ["scikit-learn", "PyTorch", "Keras", "TensorFlow"],
    databases: ["MySQL/MariaDB", "PostgreSQL", "MSSQL", "MongoDB"],
    tools: ["Git", "Docker"]
  };

  const commands: { [key: string]: () => React.ReactNode } = {
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
          <div><span className="text-command">clear</span> <span className="text-muted-term">- Clear terminal screen</span></div>
          <div><span className="text-command">whoami</span> <span className="text-muted-term">- Display current user</span></div>
          <div><span className="text-command">ls</span> <span className="text-muted-term">- List available commands</span></div>
          <div><span className="text-command">banner</span> <span className="text-muted-term">- Display welcome banner</span></div>
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
          <span className="text-command">help</span>
          <span className="text-command">clear</span>
        </div>
      </div>
    ),
    about: () => (
      <div className="command-output">
        <p className="text-highlight">Theodoros Psallidas</p>
        <p className="text-normal">Full Stack Software Engineer & Machine Learning Engineer</p>
        <p className="text-muted-term">
          Passionate about building intelligent systems that bridge the gap between
          cutting-edge ML research and production-ready applications. Currently working
          at Behavioral Signals on AI-driven voice and emotion recognition technologies.
        </p>
        <br />
        <p className="text-normal">📍 Location: Greece</p>
        <p className="text-normal">🎓 Education: PhD Candidate in Computer Science</p>
        <p className="text-normal">💼 Focus: Full Stack Development, Machine Learning, Audio Processing</p>
      </div>
    ),
    whoami: () => (
      <div className="command-output">
        <p className="text-command">theodoros@portfolio ~ %</p>
      </div>
    ),
    experience: () => (
      <div className="command-output">
        <p className="text-highlight">Work Experience:</p>
        {experience.map((exp, idx) => (
          <div key={idx} className="experience-item">
            <p className="text-command">{exp.title}</p>
            <p className="text-normal">{exp.org} • {exp.location}</p>
            <p className="text-muted-term">{exp.date}</p>
            <p className="text-normal">
              <span className="text-keyword">Tech:</span>{' '}
              {exp.tech.map((tech, i) => (
                <span key={i}>
                  <span className="text-string">{tech}</span>
                  {i < exp.tech.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
            {idx < experience.length - 1 && <div className="separator" />}
          </div>
        ))}
      </div>
    ),
    education: () => (
      <div className="command-output">
        <p className="text-highlight">Education:</p>
        {education.map((edu, idx) => (
          <div key={idx} className="education-item">
            <p className="text-command">{edu.degree}</p>
            <p className="text-normal">{edu.school}</p>
            <p className="text-muted-term">{edu.location} • {edu.date}</p>
            {edu.thesis && (
              <p className="text-normal">
                <span className="text-keyword">Thesis:</span>{' '}
                <span className="text-string">"{edu.thesis}"</span>
              </p>
            )}
            {idx < education.length - 1 && <div className="separator" />}
          </div>
        ))}
      </div>
    ),
    skills: () => (
      <div className="command-output">
        <p className="text-highlight">Technical Skills:</p>
        <div className="skills-grid">
          <div>
            <p className="text-keyword">Languages:</p>
            <p className="text-normal">{skills.languages.join(', ')}</p>
          </div>
          <div>
            <p className="text-keyword">Frameworks:</p>
            <p className="text-normal">{skills.frameworks.join(', ')}</p>
          </div>
          <div>
            <p className="text-keyword">ML/AI:</p>
            <p className="text-normal">{skills.ml.join(', ')}</p>
          </div>
          <div>
            <p className="text-keyword">Databases:</p>
            <p className="text-normal">{skills.databases.join(', ')}</p>
          </div>
          <div>
            <p className="text-keyword">Tools:</p>
            <p className="text-normal">{skills.tools.join(', ')}</p>
          </div>
        </div>
      </div>
    ),
    contact: () => (
      <div className="command-output">
        <p className="text-highlight">Contact Information:</p>
        <div className="contact-links">
          <p>
            <span className="text-keyword">GitHub:</span>{' '}
            <a href="https://github.com/theopsall" target="_blank" rel="noopener noreferrer" className="text-link">
              github.com/theopsall
            </a>
          </p>
          <p>
            <span className="text-keyword">LinkedIn:</span>{' '}
            <a href="https://www.linkedin.com/in/theodoros-psallidas" target="_blank" rel="noopener noreferrer" className="text-link">
              linkedin.com/in/theodoros-psallidas
            </a>
          </p>
          <p>
            <span className="text-keyword">Email:</span>{' '}
            <a href="mailto:theopsall@gmail.com" className="text-link">
              theopsall@gmail.com
            </a>
          </p>
          <p>
            <span className="text-keyword">Google Scholar:</span>{' '}
            <a href="https://scholar.google.com/citations?user=YOUR_ID" target="_blank" rel="noopener noreferrer" className="text-link">
              View Publications
            </a>
          </p>
        </div>
      </div>
    ),
    projects: () => (
      <div className="command-output">
        <p className="text-highlight">GitHub Projects:</p>
        <p className="text-muted-term">Fetching repositories from GitHub...</p>
        <p className="text-normal">Visit <a href="https://github.com/theopsall?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-link">github.com/theopsall</a> to see all projects</p>
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

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === 'clear') {
      setHistory([getWelcomeBanner()]);
      return;
    }

    let output: React.ReactNode;

    if (trimmedCmd === '') {
      output = null;
    } else if (commands[trimmedCmd]) {
      output = commands[trimmedCmd]();
    } else {
      output = (
        <div className="command-output">
          <p className="text-error">Command not found: {cmd}</p>
          <p className="text-muted-term">Type <span className="text-command">help</span> to see available commands.</p>
        </div>
      );
    }

    setHistory([...history, { command: cmd, output }]);
    setCommandHistory([...commandHistory, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="terminal-container">
      <DarkVeil className="dark-veil-background" />
      <div className="terminal-overlay">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="traffic-lights">
              <span className="light light-close"></span>
              <span className="light light-minimize"></span>
              <span className="light light-maximize"></span>
            </div>
            <div className="terminal-title">
              <span className="title-icon">&gt;_</span>
              <span>theodoros@portfolio ~ shell</span>
            </div>
            <div className="terminal-actions"></div>
          </div>
          <div className="terminal-body" ref={terminalRef} onClick={handleTerminalClick}>
            {history.map((item, idx) => (
              <div key={idx} className="terminal-line">
                {item.command && (
                  <div className="command-line">
                    <span className="prompt">
                      <span className="prompt-user">theodoros</span>
                      <span className="prompt-at">@</span>
                      <span className="prompt-host">portfolio</span>
                      <span className="prompt-separator"> ~ </span>
                      <span className="prompt-symbol">%</span>
                    </span>
                    <span className="command-text">{item.command}</span>
                  </div>
                )}
                {item.output && <div className="output">{item.output}</div>}
              </div>
            ))}
            <div className="terminal-line input-line">
              <span className="prompt">
                <span className="prompt-user">theodoros</span>
                <span className="prompt-at">@</span>
                <span className="prompt-host">portfolio</span>
                <span className="prompt-separator"> ~ </span>
                <span className="prompt-symbol">%</span>
              </span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
