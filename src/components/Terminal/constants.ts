export const HOME_FILES = [
  'about.md',
  'experience.log',
  'skills.txt',
  'education.txt',
  'contact.md',
  'projects.md',
  'readme.md',
] as const;

export const HOME_DIRS = ['blog'] as const;

export const FILE_TO_COMMAND: Record<string, string> = {
  'about.md':       'about',
  'experience.log': 'experience',
  'skills.txt':     'skills',
  'education.txt':  'education',
  'contact.md':     'contact',
  'readme.md':      'home',
  'projects.md':    'projects',
};

export const COMMAND_DESCRIPTIONS: Record<string, string> = {
  home: 'Display welcome screen',
  about: 'Display information about me',
  experience: 'Show work experience',
  education: 'Show educational background',
  skills: 'List technical skills',
  contact: 'Get contact information',
  projects: 'View GitHub projects',
  blog: 'List / open blog articles',
  cd: 'Change directory (cd blog, cd ..)',
  clear: 'Clear terminal screen',
  whoami: 'Display current user',
  ls: 'List files and commands',
  cat: 'Read a file (e.g. cat about.md)',
  echo: 'Echo text to terminal',
  banner: 'Display welcome banner',
  pwd: 'Print working directory',
  date: 'Display current date',
  sudo: 'Run as superuser',
  exit: 'Exit terminal',
  ps: 'Show running processes',
  '?': 'Show help (alias for help)',
};

export const EXPERIENCE_DATA = [
  { title: 'Senior Software Engineer', org: 'ProxyFoods', url: 'https://proxyfoods.ai', location: 'Greece', date: 'Feb 2026 - Present', tech: ['AI/ML', 'ReactJS', 'FastAPI'] },
  { title: 'Full Stack Software Engineer', org: 'Behavioral Signals', url: 'https://behavioralsignals.com', location: 'Greece', date: 'March 2024 - Feb 2026', tech: ['ReactJS', 'FastAPI', 'Django', 'AI/ML'] },
  { title: 'Full Stack Software Engineer', org: 'Optechain', url: 'https://optechain.com', location: 'Argyroupoli, Greece', date: 'Oct 2020 - Feb 2024', tech: ['ReactJS', 'React Native', 'Angular', 'NodeJS', 'C#'] },
];

export const EDUCATION_DATA = [
  { degree: 'PhD Candidate in Computer Science', school: 'University of Thessaly', location: 'Lamia, Greece', date: '2021 - Present', thesis: undefined as string | undefined },
  { degree: 'MSc in Data Science', school: 'University of Peloponnese', location: 'Lamia, Greece', date: '2019 - 2021', thesis: 'Multimodal summarization of user-generated videos from wearable cameras' },
  { degree: 'BSc in Computer Science', school: 'University of Thessaly', location: 'Lamia, Greece', date: '2013 - 2018', thesis: undefined as string | undefined },
];

export const SKILLS_DATA = {
  languages: ['Python', 'TypeScript', 'JavaScript', 'C'],
  frameworks: ['ReactJS', 'Angular', 'Flask', 'Django', 'NodeJS'],
  ml: ['scikit-learn', 'PyTorch', 'Keras', 'TensorFlow'],
  databases: ['MySQL/MariaDB', 'PostgreSQL', 'MSSQL', 'MongoDB'],
  tools: ['Git', 'Docker'],
};

export const PROCESS_DATA = [
  { pid: 1,   user: 'theopsall', start: '1995-02-07', cpu: '99.9', mem: '100.0', stat: 'R+', cmd: 'living --fullstack --ai' },
  { pid: 42,  user: 'theopsall', start: '2013-09-01', cpu: '92.4', mem: '87.3',  stat: 'R',  cmd: 'coding --lang=python,ts,js,c' },
  { pid: 100, user: 'theopsall', start: '2021-01-01', cpu: '95.1', mem: '91.7',  stat: 'R',  cmd: 'phd --cs --university-of-thessaly' },
  { pid: 200, user: 'theopsall', start: '2024-03-01', cpu: '88.6', mem: '76.2',  stat: 'R',  cmd: 'work --org=proxyfoods --role=senior-swe' },
  { pid: 301, user: 'theopsall', start: '2019-01-01', cpu: '78.3', mem: '68.5',  stat: 'S',  cmd: 'ml-research --pytorch --keras --faiss' },
  { pid: 404, user: 'theopsall', start: '2020-01-01', cpu: '45.2', mem: '32.1',  stat: 'S',  cmd: 'open-source --github=theopsall' },
  { pid: 512, user: 'barney',    start: '2020-01-01', cpu: '100.0', mem: '99.9', stat: 'R+', cmd: 'pair-programming --with=theopsall --treats=yes' },
];
