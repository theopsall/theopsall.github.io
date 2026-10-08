// Source of truth for the Open source section, index.md and the page's JSON-LD. Stars are a snapshot (2026-10-08).
export interface Project {
  name: string;
  description: string;
  language: string;
  stars: number;
}

export const GITHUB_USER_URL = 'https://github.com/theopsall';
export const repoUrl = (name: string) => `${GITHUB_USER_URL}/${name}`;

export const PROJECTS: Project[] = [
  { name: 'Video-Summarization', description: 'Code and dataset for my MSc thesis on multimodal summarization of user-generated videos from wearable cameras.', language: 'Jupyter Notebook', stars: 22 },
  { name: 'multiSmote', description: 'A multi-label approach to the SMOTE oversampling algorithm.', language: 'Python', stars: 10 },
  { name: 'deep_video_extraction', description: 'Deep visual and audio feature extraction from video with pre-trained models.', language: 'Python', stars: 9 },
  { name: 'video_annotator', description: 'Web app for annotating video shots, used to build the thesis ground truth.', language: 'Python', stars: 6 },
];
