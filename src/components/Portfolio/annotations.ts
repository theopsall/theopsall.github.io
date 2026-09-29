// `= note:` lines shown under a role's source. Each restates a phrase that
// already appears in that role's highlights in Terminal/constants.ts.
export interface Annotation {
  span: string;
  note: string;
}

export const ANNOTATIONS: Record<string, Annotation[]> = {
  'ProxyFoods|Feb 2025 - Present': [
    { span: 'Formulation engine', note: 'core domain model' },
    { span: 'LangGraph', note: 'agent orchestration' },
    { span: 'human-in-the-loop', note: 'a person approves ingredient matches' },
    { span: 'OpenFGA', note: 'authorization shared across services' },
  ],
  'MyTripMyWay|Jun 2025 - Mar 2026': [
    { span: 'six interpretable travel personas', note: 'basis of the recommendations' },
    { span: 'itinerary feasibility modeling', note: 'checks a plan can actually be travelled' },
    { span: 'booking and payment flows', note: 'Stripe' },
  ],
  'Behavioral Signals|Mar 2024 - Feb 2025': [
    { span: 'agent matching', note: 'real-time routing' },
    { span: 'audio deepfake detection', note: 'designed, built and owned end-to-end' },
  ],
  'NCSR Demokritos|Dec 2022 - Feb 2024': [
    { span: 'music copyright monitoring', note: 'Museek project' },
    { span: 'FAISS vector search', note: 'lower detection latency' },
  ],
  'Optechain|Oct 2020 - Feb 2024': [
    { span: 'digital signage and EV-charging stations', note: 'led frontend and backend' },
    { span: 'device-fleet updates', note: 'safer rollouts' },
  ],
  'NCSR Demokritos|Dec 2019 - Jul 2022': [
    { span: 'video summarization', note: 'Enorasi project' },
    { span: 'feature-fusion experiments', note: 'architecture and fusion changes' },
    { span: 'benchmark labeling', note: 'less evaluation variance' },
  ],
};

export const CV_HREF = './Theodoros_Psallidas_CV.pdf';

export const CONTACT_LINKS = [
  { label: 'Email', text: 'theopsall@gmail.com', href: 'mailto:theopsall@gmail.com' },
  { label: 'GitHub', text: 'github.com/theopsall', href: 'https://github.com/theopsall' },
  { label: 'LinkedIn', text: 'linkedin.com/in/tpsallidas', href: 'https://www.linkedin.com/in/tpsallidas' },
] as const;
