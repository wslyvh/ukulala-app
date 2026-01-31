/**
 * Common chord progressions stored as Roman numeral sequences.
 * Use resolveProgression() from utils/music.ts to get concrete chord names for a key.
 */

export type Numeral =
  | 'I' | 'ii' | 'iii' | 'IV' | 'V' | 'vi' | 'vii°'
  | 'I7' | 'ii7' | 'IV7' | 'V7' | 'vi7';

export type ProgressionData = {
  id: string;
  name: string;
  numerals: Numeral[];
  genre: string;
  description: string;
};

export const progressions: ProgressionData[] = [
  // --- Pop ---
  {
    id: 'major-4',
    name: 'Major 4',
    numerals: ['I', 'V', 'vi', 'IV'],
    genre: 'Pop',
    description: 'The most popular progression in modern music. Used in countless hits.',
  },
  {
    id: 'major-4-rotation',
    name: 'Major 4 Rotation',
    numerals: ['IV', 'I', 'vi', 'V'],
    genre: 'Pop',
    description: 'A rotation of the Major 4, starting on the subdominant.',
  },
  {
    id: 'major-4-sub',
    name: 'Major 4 Subdominant',
    numerals: ['I', 'V', 'ii', 'IV'],
    genre: 'Pop',
    description: 'Major 4 variant replacing vi with ii for a brighter feel.',
  },
  {
    id: 'minor-4',
    name: 'Minor 4',
    numerals: ['I', 'vi', 'iii', 'vii°'],
    genre: 'Pop',
    description: 'A darker four-chord progression descending through minor territory.',
  },
  {
    id: 'major-upbeat',
    name: 'Major Upbeat',
    numerals: ['I', 'IV', 'I', 'V', 'I'],
    genre: 'Pop',
    description: 'Bouncy and optimistic with repeated tonic anchoring.',
  },
  {
    id: 'majors',
    name: 'Majors',
    numerals: ['I', 'vi', 'ii', 'V'],
    genre: 'Pop',
    description: 'Circle-of-fifths movement through major and minor chords.',
  },
  {
    id: 'minor-upbeat',
    name: 'Minor Upbeat',
    numerals: ['I', 'vi', 'iii', 'vii°', 'I'],
    genre: 'Pop',
    description: 'An upbeat feel with a minor-flavored descent back to the tonic.',
  },

  // --- Alternative ---
  {
    id: 'creep',
    name: 'Creep',
    numerals: ['I', 'iii', 'IV', 'I'],
    genre: 'Alternative',
    description: 'Made famous by Radiohead. A haunting, tension-filled loop.',
  },
  {
    id: 'wonderwall',
    name: 'Wonderwall Progression',
    numerals: ['I', 'iii', 'vii°', 'IV'],
    genre: 'Britpop',
    description: 'The signature Oasis sound. Moody and anthemic.',
  },

  // --- Folk ---
  {
    id: 'sweet-cheerful',
    name: "Sweet 'n Cheerful",
    numerals: ['I', 'IV', 'V', 'IV'],
    genre: 'Folk',
    description: 'A bright, uplifting campfire-style progression.',
  },

  // --- Oldies ---
  {
    id: 'happy-days',
    name: 'Happy Days - 50s',
    numerals: ['I', 'vi', 'IV', 'V'],
    genre: 'Oldies',
    description: 'Classic 1950s doo-wop progression. Pure nostalgia.',
  },

  // --- Jazz ---
  {
    id: 'jazz-turnaround',
    name: 'Jazz Turnaround',
    numerals: ['ii', 'V', 'I', 'vi'],
    genre: 'Jazz',
    description: 'Standard jazz turnaround starting with the classic ii-V resolution.',
  },
  {
    id: 'jazz-progression',
    name: 'Jazz Progression',
    numerals: ['ii', 'V', 'I', 'IV'],
    genre: 'Jazz',
    description: 'Extended ii-V-I resolving onward to the subdominant.',
  },

  // --- Blues ---
  {
    id: 'blues-turnaround',
    name: 'Blues Turnaround',
    numerals: ['I', 'IV', 'I', 'V'],
    genre: 'Blues',
    description: 'A short blues turnaround with dominant tension.',
  },
  {
    id: 'blues-progression',
    name: 'Blues Progression',
    numerals: ['I', 'IV', 'I', 'I'],
    genre: 'Blues',
    description: 'Simple two-chord blues vamp over four bars.',
  },
  {
    id: '8-bar-blues',
    name: '8-bar Blues',
    numerals: ['I', 'V', 'IV', 'IV', 'I', 'V', 'I', 'V'],
    genre: 'Blues',
    description: 'Compact 8-bar blues form. A shorter alternative to the 12-bar.',
  },
  {
    id: '12-bar-blues',
    name: '12-Bar Blues',
    numerals: ['I', 'I', 'I', 'I', 'IV', 'IV', 'I', 'I', 'V', 'IV', 'I', 'I'],
    genre: 'Blues',
    description: 'The quintessential blues form. Twelve bars of pure soul.',
  },

  // --- Rock ---
  {
    id: 'rock-majors',
    name: 'Rock Majors',
    numerals: ['I', 'IV', 'V'],
    genre: 'Rock',
    description: 'The essential three-chord rock foundation.',
  },
  {
    id: 'rock-majors-rotation',
    name: 'Rock Majors Rotation',
    numerals: ['V', 'IV', 'I'],
    genre: 'Rock',
    description: 'Reversed rock cadence. Resolves downward to the tonic.',
  },
  {
    id: 'rock-n-roll',
    name: "Rock 'n Roll",
    numerals: ['I', 'IV', 'V', 'I'],
    genre: 'Rock',
    description: 'The classic rock and roll loop with a satisfying resolution.',
  },

  // --- Flamenco ---
  {
    id: 'andalusian-cadence',
    name: 'Andalusian Cadence',
    numerals: ['vi', 'V', 'IV', 'iii'],
    genre: 'Flamenco',
    description: 'Iconic descending progression from Spanish and flamenco music.',
  },
  {
    id: 'andalusian-cadence-major',
    name: 'Andalusian Cadence (Major)',
    numerals: ['I', 'vii°', 'vi', 'V'],
    genre: 'Flamenco',
    description: 'Major-key variant of the Andalusian descent.',
  },

  // --- Classical ---
  {
    id: 'canon-in-d',
    name: 'Canon in D',
    numerals: ['I', 'V', 'vi', 'iii'],
    genre: 'Classical',
    description: "From Pachelbel's Canon. Elegant and timeless.",
  },

  // --- J-Pop ---
  {
    id: 'royal-road',
    name: 'Royal Road',
    numerals: ['IV', 'V', 'iii', 'vi'],
    genre: 'J-Pop',
    description: 'The "Royal Road" progression — a cornerstone of Japanese pop and anime music.',
  },
];

export const GENRES = [...new Set(progressions.map((p) => p.genre))];
