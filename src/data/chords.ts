export type ChordCategory =
  | 'major'
  | 'minor'
  | 'seventh'
  | 'diminished'
  | 'augmented'
  | 'suspended'
  | 'other';

export type ChordVoicing = {
  frets: [number, number, number, number];
  fingers: [number, number, number, number];
  barFret?: number;
};

export type ChordData = {
  name: string;
  fullName: string;
  category: ChordCategory;
  frets: [number, number, number, number];
  fingers: [number, number, number, number];
  barFret?: number;
  voicings?: ChordVoicing[];
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

/** Returns all voicings for a chord (default first, then alternatives). */
export function getAllVoicings(chord: ChordData): ChordVoicing[] {
  const defaultVoicing: ChordVoicing = {
    frets: chord.frets,
    fingers: chord.fingers,
    ...(chord.barFret != null && { barFret: chord.barFret }),
  };
  return [defaultVoicing, ...(chord.voicings ?? [])];
}

/** Returns a chord with the preferred voicing applied. */
export function applyVoicing(chord: ChordData, voicingIndex: number): ChordData {
  if (voicingIndex === 0 || !chord.voicings) return chord;
  const voicing = chord.voicings[voicingIndex - 1];
  if (!voicing) return chord;
  return { ...chord, frets: voicing.frets, fingers: voicing.fingers, barFret: voicing.barFret };
}
