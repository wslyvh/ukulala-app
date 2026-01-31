import type { Numeral } from '../data/progressions';

/**
 * All 12 chromatic notes using sharps/flats as commonly used for ukulele.
 * We store both a "sharp" and "flat" spelling per key so we can pick
 * the conventional one.
 */
export const ALL_KEYS = [
  'C', 'Db', 'D', 'Eb', 'E', 'F',
  'F#', 'G', 'Ab', 'A', 'Bb', 'B',
] as const;

export type Key = (typeof ALL_KEYS)[number];

/**
 * Maps a Roman numeral to a semitone offset from the root
 * and a quality suffix for chord name construction.
 */
type NumeralInfo = { semitones: number; suffix: string };

const NUMERAL_MAP: Record<Numeral, NumeralInfo> = {
  'I':    { semitones: 0,  suffix: '' },
  'ii':   { semitones: 2,  suffix: 'm' },
  'iii':  { semitones: 4,  suffix: 'm' },
  'IV':   { semitones: 5,  suffix: '' },
  'V':    { semitones: 7,  suffix: '' },
  'vi':   { semitones: 9,  suffix: 'm' },
  'vii°': { semitones: 11, suffix: 'dim' },
  'I7':   { semitones: 0,  suffix: '7' },
  'ii7':  { semitones: 2,  suffix: 'm7' },
  'IV7':  { semitones: 5,  suffix: '7' },
  'V7':   { semitones: 7,  suffix: '7' },
  'vi7':  { semitones: 9,  suffix: 'm7' },
};

/**
 * Transpose a note name by a number of semitones.
 * Returns the enharmonic spelling from ALL_KEYS.
 */
function transposeNote(root: Key, semitones: number): string {
  const rootIndex = ALL_KEYS.indexOf(root);
  const newIndex = (rootIndex + semitones) % 12;
  return ALL_KEYS[newIndex];
}

/**
 * Resolve a Roman numeral in a given key to a concrete chord name.
 * e.g. resolveNumeral('G', 'vi') => 'Em'
 */
export function resolveNumeral(key: Key, numeral: Numeral): string {
  const info = NUMERAL_MAP[numeral];
  const noteName = transposeNote(key, info.semitones);
  return noteName + info.suffix;
}

/**
 * Resolve a full progression of Roman numerals in a given key.
 * e.g. resolveProgression('C', ['I', 'V', 'vi', 'IV']) => ['C', 'G', 'Am', 'F']
 */
export function resolveProgression(key: Key, numerals: Numeral[]): string[] {
  return numerals.map((n) => resolveNumeral(key, n));
}

/**
 * Map a Roman numeral to its scale degree (1-7).
 */
const DEGREE_MAP: Record<Numeral, number> = {
  'I': 1, 'ii': 2, 'iii': 3, 'IV': 4, 'V': 5, 'vi': 6, 'vii°': 7,
  'I7': 1, 'ii7': 2, 'IV7': 4, 'V7': 5, 'vi7': 6,
};

export function numeralDegree(numeral: Numeral): number {
  return DEGREE_MAP[numeral];
}

/** Pick a random element from an array. */
export function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
