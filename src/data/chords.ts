/**
 * Ukulele chord data.
 *
 * Each chord has:
 * - name: display name (e.g. "C")
 * - fullName: descriptive name (e.g. "C Major")
 * - category: chord quality for filtering
 * - frets: [G, C, E, A] — fret numbers for each string (0 = open, -1 = muted)
 * - fingers: [G, C, E, A] — which finger to use (0 = open/none)
 * - barFret: optional barre fret number
 *
 * Standard ukulele tuning: G4-C4-E4-A4
 */

export type ChordCategory =
  | 'major'
  | 'minor'
  | 'seventh'
  | 'diminished'
  | 'augmented'
  | 'suspended'
  | 'other';

export type ChordData = {
  name: string;
  fullName: string;
  category: ChordCategory;
  frets: [number, number, number, number];
  fingers: [number, number, number, number];
  barFret?: number;
};

export const CHORD_CATEGORIES: { key: ChordCategory; label: string }[] = [
  { key: 'major', label: 'Major' },
  { key: 'minor', label: 'Minor' },
  { key: 'seventh', label: '7th' },
  { key: 'diminished', label: 'Dim' },
  { key: 'augmented', label: 'Aug' },
  { key: 'suspended', label: 'Sus' },
  { key: 'other', label: 'Other' },
];

export const chords: ChordData[] = [
  // === MAJOR ===
  { name: 'C', fullName: 'C Major', category: 'major', frets: [0, 0, 0, 3], fingers: [0, 0, 0, 3] },
  { name: 'D', fullName: 'D Major', category: 'major', frets: [2, 2, 2, 0], fingers: [1, 1, 1, 0], barFret: 2 },
  { name: 'E', fullName: 'E Major', category: 'major', frets: [1, 4, 0, 2], fingers: [1, 4, 0, 2] },
  { name: 'F', fullName: 'F Major', category: 'major', frets: [2, 0, 1, 0], fingers: [2, 0, 1, 0] },
  { name: 'G', fullName: 'G Major', category: 'major', frets: [0, 2, 3, 2], fingers: [0, 1, 3, 2] },
  { name: 'A', fullName: 'A Major', category: 'major', frets: [2, 1, 0, 0], fingers: [2, 1, 0, 0] },
  { name: 'Bb', fullName: 'Bb Major', category: 'major', frets: [3, 2, 1, 1], fingers: [4, 3, 1, 1], barFret: 1 },
  { name: 'B', fullName: 'B Major', category: 'major', frets: [4, 3, 2, 2], fingers: [4, 3, 1, 1], barFret: 2 },
  { name: 'Db', fullName: 'Db Major', category: 'major', frets: [1, 1, 1, 4], fingers: [1, 1, 1, 4], barFret: 1 },
  { name: 'Eb', fullName: 'Eb Major', category: 'major', frets: [0, 3, 3, 1], fingers: [0, 2, 3, 1] },
  { name: 'Ab', fullName: 'Ab Major', category: 'major', frets: [5, 3, 4, 3], fingers: [4, 1, 2, 1], barFret: 3 },

  // === MINOR ===
  { name: 'Am', fullName: 'A Minor', category: 'minor', frets: [2, 0, 0, 0], fingers: [1, 0, 0, 0] },
  { name: 'Bm', fullName: 'B Minor', category: 'minor', frets: [4, 2, 2, 2], fingers: [4, 1, 1, 1], barFret: 2 },
  { name: 'Cm', fullName: 'C Minor', category: 'minor', frets: [0, 3, 3, 3], fingers: [0, 1, 2, 3] },
  { name: 'Dm', fullName: 'D Minor', category: 'minor', frets: [2, 2, 1, 0], fingers: [2, 3, 1, 0] },
  { name: 'Em', fullName: 'E Minor', category: 'minor', frets: [0, 4, 3, 2], fingers: [0, 3, 2, 1] },
  { name: 'Fm', fullName: 'F Minor', category: 'minor', frets: [1, 0, 1, 3], fingers: [1, 0, 2, 4] },
  { name: 'Gm', fullName: 'G Minor', category: 'minor', frets: [0, 2, 3, 1], fingers: [0, 2, 3, 1] },
  { name: 'Bbm', fullName: 'Bb Minor', category: 'minor', frets: [3, 1, 1, 1], fingers: [4, 1, 1, 1], barFret: 1 },
  { name: 'F#m', fullName: 'F# Minor', category: 'minor', frets: [2, 1, 2, 0], fingers: [2, 1, 3, 0] },

  // === SEVENTH ===
  { name: 'C7', fullName: 'C Dominant 7th', category: 'seventh', frets: [0, 0, 0, 1], fingers: [0, 0, 0, 1] },
  { name: 'D7', fullName: 'D Dominant 7th', category: 'seventh', frets: [2, 2, 2, 3], fingers: [1, 1, 1, 2], barFret: 2 },
  { name: 'E7', fullName: 'E Dominant 7th', category: 'seventh', frets: [1, 2, 0, 2], fingers: [1, 2, 0, 3] },
  { name: 'F7', fullName: 'F Dominant 7th', category: 'seventh', frets: [2, 3, 1, 3], fingers: [1, 3, 1, 4] },
  { name: 'G7', fullName: 'G Dominant 7th', category: 'seventh', frets: [0, 2, 1, 2], fingers: [0, 2, 1, 3] },
  { name: 'A7', fullName: 'A Dominant 7th', category: 'seventh', frets: [0, 1, 0, 0], fingers: [0, 1, 0, 0] },
  { name: 'B7', fullName: 'B Dominant 7th', category: 'seventh', frets: [2, 3, 2, 2], fingers: [1, 2, 1, 1], barFret: 2 },
  { name: 'Bb7', fullName: 'Bb Dominant 7th', category: 'seventh', frets: [1, 2, 1, 1], fingers: [1, 2, 1, 1], barFret: 1 },

  // === DIMINISHED ===
  { name: 'Cdim', fullName: 'C Diminished', category: 'diminished', frets: [0, 3, 2, 3], fingers: [0, 2, 1, 3] },
  { name: 'Ddim', fullName: 'D Diminished', category: 'diminished', frets: [1, 0, 1, 0], fingers: [1, 0, 2, 0] },
  { name: 'Edim', fullName: 'E Diminished', category: 'diminished', frets: [0, 4, 0, 1], fingers: [0, 4, 0, 1] },

  // === AUGMENTED ===
  { name: 'Caug', fullName: 'C Augmented', category: 'augmented', frets: [1, 0, 0, 3], fingers: [1, 0, 0, 4] },
  { name: 'Daug', fullName: 'D Augmented', category: 'augmented', frets: [3, 2, 2, 1], fingers: [4, 2, 3, 1] },
  { name: 'Eaug', fullName: 'E Augmented', category: 'augmented', frets: [1, 0, 0, 3], fingers: [1, 0, 0, 4] },

  // === SUSPENDED ===
  { name: 'Csus2', fullName: 'C Suspended 2nd', category: 'suspended', frets: [0, 2, 3, 3], fingers: [0, 1, 2, 3] },
  { name: 'Csus4', fullName: 'C Suspended 4th', category: 'suspended', frets: [0, 0, 1, 3], fingers: [0, 0, 1, 3] },
  { name: 'Dsus2', fullName: 'D Suspended 2nd', category: 'suspended', frets: [2, 2, 0, 0], fingers: [1, 2, 0, 0] },
  { name: 'Dsus4', fullName: 'D Suspended 4th', category: 'suspended', frets: [0, 2, 3, 0], fingers: [0, 1, 2, 0] },
  { name: 'Gsus4', fullName: 'G Suspended 4th', category: 'suspended', frets: [0, 2, 3, 3], fingers: [0, 1, 2, 3] },
  { name: 'Asus2', fullName: 'A Suspended 2nd', category: 'suspended', frets: [2, 4, 0, 0], fingers: [1, 4, 0, 0] },
  { name: 'Asus4', fullName: 'A Suspended 4th', category: 'suspended', frets: [2, 2, 0, 0], fingers: [1, 2, 0, 0] },

  // === OTHER (Maj7, min7) ===
  { name: 'Cmaj7', fullName: 'C Major 7th', category: 'other', frets: [0, 0, 0, 2], fingers: [0, 0, 0, 2] },
  { name: 'Fmaj7', fullName: 'F Major 7th', category: 'other', frets: [2, 4, 1, 3], fingers: [2, 4, 1, 3] },
  { name: 'Gmaj7', fullName: 'G Major 7th', category: 'other', frets: [0, 2, 2, 2], fingers: [0, 1, 2, 3] },
  { name: 'Am7', fullName: 'A Minor 7th', category: 'other', frets: [0, 0, 0, 0], fingers: [0, 0, 0, 0] },
  { name: 'Dm7', fullName: 'D Minor 7th', category: 'other', frets: [2, 2, 1, 3], fingers: [2, 3, 1, 4] },
  { name: 'Em7', fullName: 'E Minor 7th', category: 'other', frets: [0, 2, 0, 2], fingers: [0, 1, 0, 2] },
];

/** Lookup chord by name. Returns undefined if not found. */
export function findChord(name: string): ChordData | undefined {
  return chords.find((c) => c.name === name);
}
