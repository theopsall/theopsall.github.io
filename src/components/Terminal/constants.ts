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
  'about.md':      'about',
  'experience.log': 'experience',
  'skills.txt':    'skills',
  'education.txt': 'education',
  'contact.md':    'contact',
  'readme.md':     'home',
  'projects.md':   'projects',
};
