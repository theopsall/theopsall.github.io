// Source of truth for the Publications section, index.md and the page's JSON-LD. Verified against Crossref/dblp/Scholar.
export interface Publication {
  year: number;
  title: string;
  venue: string;
  authors: string;
  doi: string;
}

export const PUBLICATIONS: Publication[] = [
  { year: 2024, title: 'A multimodal dataset for electric guitar playing technique recognition', venue: 'Data in Brief', authors: 'A. Mitsou et al.', doi: '10.1016/j.dib.2023.109842' },
  { year: 2023, title: 'Video summarization based on feature fusion and data augmentation', venue: 'Computers', authors: 'T. Psallidas, E. Spyrou', doi: '10.3390/computers12090186' },
  { year: 2022, title: 'Summarization of user-generated videos fusing handcrafted and deep audiovisual features', venue: 'SMAP', authors: 'T. Psallidas, E. Spyrou, S. J. Perantonis', doi: '10.1109/SMAP56125.2022.9941864' },
  { year: 2022, title: 'ENORASI assistive computer vision-based system for the visually impaired: a user evaluation study', venue: 'PETRA', authors: 'A. Mitsou et al.', doi: '10.1145/3529190.3534784' },
  { year: 2022, title: 'Multimodal video summarization based on fuzzy similarity features', venue: 'IEEE IVMSP', authors: 'T. Psallidas, M. D. Vasilakakis, E. Spyrou, D. K. Iakovidis', doi: '10.1109/IVMSP54334.2022.9816266' },
  { year: 2021, title: 'Multimodal summarization of user-generated videos', venue: 'Applied Sciences', authors: 'T. Psallidas et al.', doi: '10.3390/app11115260' },
  { year: 2020, title: 'Dimensionality reduction and attention mechanisms for extracting affective state from sound spectrograms', venue: 'ICPRAM', authors: 'G. Pikramenos et al.', doi: '10.1007/978-3-030-66125-0_3' },
];

export const doiUrl = (doi: string) => `https://doi.org/${doi}`;
