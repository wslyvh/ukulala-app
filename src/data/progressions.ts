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
    id: 'stepwise-pop',
    name: 'Stepwise Pop',
    numerals: ['I', 'ii', 'IV'],
    genre: 'Pop',
    description: 'Beginner-friendly lift from tonic to ii into IV.',
  },
  {
    id: 'pop-rotation-lift',
    name: 'Pop Rotation Lift',
    numerals: ['IV', 'I', 'V', 'vi'],
    genre: 'Pop',
    description: 'A IV-start pop loop that builds then soft-lands on vi.',
  },
  {
    id: 'doo-wop-variant',
    name: 'Doo-Wop Variant',
    numerals: ['I', 'vi', 'iii', 'V'],
    genre: 'Pop',
    description: 'Classic-sounding variant with a smooth iii step before V.',
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
  {
    id: 'sensitive-female',
    name: 'Sensitive',
    numerals: ['vi', 'IV', 'I', 'V'],
    genre: 'Pop',
    description: 'The 2000s hit machine. Emotional and instantly recognizable.',
  },
  {
    id: 'axis-rotation',
    name: 'Axis Rotation',
    numerals: ['vi', 'IV', 'V', 'I'],
    genre: 'Pop',
    description: 'A vi-start rotation. Builds tension before resolving home.',
  },
  {
    id: 'royal-road',
    name: 'Royal Road',
    numerals: ['IV', 'V', 'iii', 'vi'],
    genre: 'Pop',
    description: 'The "Royal Road" progression — a cornerstone of Japanese pop and anime music.',
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
  {
    id: 'creep',
    name: 'Creep',
    numerals: ['I', 'iii', 'IV', 'I'],
    genre: 'Rock',
    description: 'Made famous by Radiohead. A haunting, tension-filled loop.',
  },
  {
    id: 'wonderwall',
    name: 'Wonderwall',
    numerals: ['I', 'iii', 'vii°', 'IV'],
    genre: 'Rock',
    description: 'The signature Oasis sound. Moody and anthemic.',
  },
  {
    id: 'punk-drive',
    name: 'Punk Drive',
    numerals: ['I', 'V', 'IV', 'V'],
    genre: 'Rock',
    description: 'Fast and raw. Three chords and the truth.',
  },
  {
    id: 'punk-anthem',
    name: 'Punk Anthem',
    numerals: ['I', 'IV', 'V', 'IV'],
    genre: 'Rock',
    description: 'High-energy anthem loop. Play it loud and fast.',
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
    id: 'the-blues',
    name: 'The Blues',
    numerals: ['I', 'IV', 'I', 'V', 'I'],
    genre: 'Blues',
    description: 'A straightforward blues line that returns firmly to the tonic.',
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
  {
    id: 'jazz-ii-v-i',
    name: 'Jazz ii-V-I',
    numerals: ['ii7', 'V7', 'I', 'I'],
    genre: 'Jazz',
    description: 'The most fundamental jazz cadence with 7th chords.',
  },
  {
    id: 'bossa-nova',
    name: 'Bossa Nova',
    numerals: ['I', 'vi7', 'ii7', 'V7'],
    genre: 'Jazz',
    description: 'Smooth Brazilian bossa nova with lush 7th chords.',
  },
  {
    id: 'bossa-turnaround',
    name: 'Bossa Turnaround',
    numerals: ['ii7', 'V7', 'I', 'vi7'],
    genre: 'Jazz',
    description: 'Jazz-influenced bossa turnaround. Sophisticated and silky.',
  },

  // --- Classics ---
  {
    id: 'happy-days',
    name: 'Happy Days - 50s',
    numerals: ['I', 'vi', 'IV', 'V'],
    genre: 'Classics',
    description: 'Classic 1950s doo-wop progression. Pure nostalgia.',
  },
  {
    id: 'motown',
    name: 'Motown',
    numerals: ['I', 'I7', 'IV', 'IV7'],
    genre: 'Classics',
    description: 'Classic Motown color with dominant 7ths. Smooth and groovy.',
  },
  {
    id: 'soul-ballad',
    name: 'Soul Ballad',
    numerals: ['I', 'vi', 'IV', 'V'],
    genre: 'Classics',
    description: 'Timeless soul ballad form. Heart and Soul, Stand By Me.',
  },
  {
    id: 'andalusian-cadence',
    name: 'Andalusian Cadence',
    numerals: ['vi', 'V', 'IV', 'iii'],
    genre: 'Classics',
    description: 'Iconic descending progression from Spanish and flamenco music.',
  },
  {
    id: 'andalusian-cadence-major',
    name: 'Andalusian Cadence (Major)',
    numerals: ['I', 'vii°', 'vi', 'V'],
    genre: 'Classics',
    description: 'Major-key variant of the Andalusian descent.',
  },
  {
    id: 'canon-in-d',
    name: 'Canon in D',
    numerals: ['I', 'V', 'vi', 'iii'],
    genre: 'Classics',
    description: "From Pachelbel's Canon. Elegant and timeless.",
  },
  {
    id: 'doo-wop-minor',
    name: 'Doo-Wop Minor',
    numerals: ['vi', 'IV', 'I', 'V'],
    genre: 'Classics',
    description: 'The emotional minor doo-wop sound. Earth Angel vibes.',
  },

  // --- Folk & Country ---
  {
    id: 'sweet-cheerful',
    name: "Sweet 'n Cheerful",
    numerals: ['I', 'IV', 'V', 'IV'],
    genre: 'Folk & Country',
    description: 'A bright, uplifting campfire-style progression.',
  },
  {
    id: 'country-roads',
    name: 'Country Roads',
    numerals: ['I', 'V', 'vi', 'IV'],
    genre: 'Folk & Country',
    description: 'The backbone of country music. Open road sing-along.',
  },
  {
    id: 'country-waltz',
    name: 'Country Waltz',
    numerals: ['I', 'IV', 'V', 'I'],
    genre: 'Folk & Country',
    description: 'Simple country waltz. Front porch picking.',
  },
  {
    id: 'freight-train',
    name: 'Freight Train',
    numerals: ['I', 'V', 'I', 'IV'],
    genre: 'Folk & Country',
    description: 'Rolling fingerpicking pattern. A folk standard.',
  },
  {
    id: 'bluegrass-run',
    name: 'Bluegrass Run',
    numerals: ['I', 'IV', 'V', 'V'],
    genre: 'Folk & Country',
    description: 'Fast flatpicking energy. Keep your fingers moving.',
  },
  {
    id: 'folk-two-chord',
    name: 'Folk Two-Chord',
    numerals: ['I', 'V'],
    genre: 'Folk & Country',
    description: 'Minimal folk foundation that works for many campfire songs.',
  },
  {
    id: 'folk-two-chord-iv',
    name: 'Folk Two-Chord (I-IV)',
    numerals: ['I', 'IV'],
    genre: 'Folk & Country',
    description: 'Ultra-simple campfire progression using just I and IV.',
  },

  // --- Island ---
  {
    id: 'hawaiian-vamp',
    name: 'Hawaiian Vamp',
    numerals: ['I', 'IV', 'V', 'I'],
    genre: 'Island',
    description: 'The quintessential Hawaiian turnaround. Warm and sunny.',
  },
  {
    id: 'hawaiian-slack-key',
    name: 'Slack Key',
    numerals: ['I', 'V', 'IV', 'I'],
    genre: 'Island',
    description: 'Inspired by slack-key guitar traditions. Simple and sweet.',
  },
  {
    id: 'hawaiian-hula',
    name: 'Hula',
    numerals: ['I', 'IV', 'I', 'IV'],
    genre: 'Island',
    description: 'Gentle two-chord hula sway. Hypnotic and relaxing.',
  },
  {
    id: 'hawaiian-breeze',
    name: 'Island Breeze',
    numerals: ['I', 'vi', 'IV', 'V'],
    genre: 'Island',
    description: 'A breezy island progression with a touch of longing.',
  },
  {
    id: 'island-strum',
    name: 'Island Strum',
    numerals: ['I', 'V', 'vi', 'IV'],
    genre: 'Island',
    description: 'The island take on the four-chord anthem. Feels like a beach sunset.',
  },
  {
    id: 'island-lullaby',
    name: 'Island Lullaby',
    numerals: ['I', 'iii', 'IV', 'V'],
    genre: 'Island',
    description: 'Soft and dreamy. Perfect for swaying under palm trees.',
  },
  {
    id: 'island-serenade',
    name: 'Island Serenade',
    numerals: ['I', 'vi', 'ii', 'V'],
    genre: 'Island',
    description: 'A romantic island serenade with circle-of-fifths movement.',
  },
  {
    id: 'reggae-drop',
    name: 'Reggae Drop',
    numerals: ['I', 'IV', 'V', 'IV'],
    genre: 'Island',
    description: 'Classic reggae strum pattern. Laid-back island groove.',
  },
  {
    id: 'reggae-one-drop',
    name: 'One Drop',
    numerals: ['I', 'IV', 'I', 'V'],
    genre: 'Island',
    description: 'Roots reggae feel with emphasis on the off-beat.',
  },
  {
    id: 'reggae-skanking',
    name: 'Skanking',
    numerals: ['I', 'vi', 'IV', 'V'],
    genre: 'Island',
    description: 'Upbeat ska-influenced reggae progression.',
  },

  // --- Latin ---
  {
    id: 'la-bamba',
    name: 'La Bamba',
    numerals: ['I', 'IV', 'V', 'V'],
    genre: 'Latin',
    description: 'The iconic La Bamba loop. Infectious and danceable.',
  },
  {
    id: 'latin-son',
    name: 'Son Cubano',
    numerals: ['I', 'IV', 'V', 'I'],
    genre: 'Latin',
    description: 'Foundation of Cuban son music. Warm and rhythmic.',
  },
  {
    id: 'latin-bolero',
    name: 'Bolero',
    numerals: ['I', 'IV', 'V7', 'I'],
    genre: 'Latin',
    description: 'Romantic Latin bolero. Slow and passionate.',
  },
  {
    id: 'latin-cumbia',
    name: 'Cumbia',
    numerals: ['I', 'V', 'V', 'I'],
    genre: 'Latin',
    description: 'Colombian cumbia groove. Simple and infectious.',
  },
];

export const GENRES = [...new Set(progressions.map((p) => p.genre))];
