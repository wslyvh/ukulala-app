export type Article = {
  slug: string;
  symbol: string;
  title: string;
  description: string;
  comingSoon?: boolean;
};

export const articles: Article[] = [
  {
    slug: 'ukulele-basics',
    symbol: '♪',
    title: 'Ukulele Basics',
    description: 'Parts of the uke, tuning, and how to hold it.',
  },
  {
    slug: 'chord-diagrams',
    symbol: '#',
    title: 'Reading Chord Diagrams',
    description: 'How to read dots, fingers, and fret positions.',
  },
  {
    slug: 'beginner-chords',
    symbol: '○',
    title: 'Beginner Chords',
    description: 'The first 10 chords every beginner should learn.',
  },
  {
    slug: 'strumming-patterns',
    symbol: '↓',
    title: 'Strumming Patterns',
    description: 'From a single downstroke to the island strum.',
  },
  {
    slug: 'fingerpicking',
    symbol: '≋',
    title: 'Fingerpicking Basics',
    description: 'Simple arpeggio patterns to get you started.',
  },
];
