# Ukulala — Data Specifications

All data is static and bundled with the app. No persistence, no network
requests.

---

## Chords (`src/data/chords.ts`)

### Schema

```ts
type ChordData = {
  name: string;          // Short name, e.g. "Am7"
  fullName: string;      // Descriptive, e.g. "A Minor 7th"
  category: ChordCategory;
  frets: [number, number, number, number];    // [G, C, E, A] fret numbers
  fingers: [number, number, number, number];  // [G, C, E, A] finger numbers
  barFret?: number;      // Barre fret, if applicable
};

type ChordCategory =
  | 'major' | 'minor' | 'seventh' | 'diminished'
  | 'augmented' | 'suspended' | 'other';
```

### Conventions

- Fret `0` = open string, `-1` = muted string.
- Finger `0` = no finger needed (open or muted).
- Tuning is standard GCEA (re-entrant high-G).

### Inventory (47 chords)

| Category   | Count | Examples                     |
| ---------- | ----- | ---------------------------- |
| major      | 11    | C, D, E, F, G, A, Bb, B, Db, Eb, Ab |
| minor      | 9     | Am, Bm, Cm, Dm, Em, Fm, Gm, Bbm, F#m |
| seventh    | 8     | C7, D7, E7, F7, G7, A7, B7, Bb7 |
| diminished | 3     | Cdim, Ddim, Edim             |
| augmented  | 3     | Caug, Daug, Eaug             |
| suspended  | 7     | Csus2, Csus4, Dsus2, Dsus4, Gsus4, Asus2, Asus4 |
| other      | 6     | Cmaj7, Fmaj7, Gmaj7, Am7, Dm7, Em7 |

### Lookup

`findChord(name: string): ChordData | undefined` — linear scan by `name`.

---

## Progressions (`src/data/progressions.ts`)

### Schema

```ts
type ProgressionData = {
  id: string;            // URL-safe slug, e.g. "pop-1"
  name: string;          // Display name, e.g. "Pop I-V-vi-IV"
  numerals: Numeral[];   // Roman numeral sequence
  genre: string;         // Free-text genre tag
  description: string;   // One-sentence explanation
};

type Numeral =
  | 'I' | 'ii' | 'iii' | 'IV' | 'V' | 'vi' | 'vii°'
  | 'I7' | 'ii7' | 'IV7' | 'V7' | 'vi7';
```

### Inventory (24 progressions)

Every progression has a descriptive name (not just Roman numerals).

| ID                     | Name                       | Numerals                              | Genre       |
| ---------------------- | -------------------------- | ------------------------------------- | ----------- |
| major-4                | Major 4                    | I V vi IV                             | Pop         |
| major-4-rotation       | Major 4 Rotation           | IV I vi V                             | Pop         |
| major-4-sub            | Major 4 Subdominant        | I V ii IV                             | Pop         |
| minor-4                | Minor 4                    | I vi iii vii°                         | Pop         |
| major-upbeat           | Major Upbeat               | I IV I V I                            | Pop         |
| majors                 | Majors                     | I vi ii V                             | Pop         |
| minor-upbeat           | Minor Upbeat               | I vi iii vii° I                       | Pop         |
| creep                  | Creep                      | I iii IV I                            | Alternative |
| wonderwall             | Wonderwall Progression     | I iii vii° IV                         | Britpop     |
| sweet-cheerful         | Sweet 'n Cheerful          | I IV V IV                             | Folk        |
| happy-days             | Happy Days - 50s           | I vi IV V                             | Oldies      |
| jazz-turnaround        | Jazz Turnaround            | ii V I vi                             | Jazz        |
| jazz-progression       | Jazz Progression           | ii V I IV                             | Jazz        |
| blues-turnaround       | Blues Turnaround            | I IV I V                              | Blues       |
| blues-progression      | Blues Progression           | I IV I I                              | Blues       |
| 8-bar-blues            | 8-bar Blues                 | I V IV IV I V I V                     | Blues       |
| 12-bar-blues           | 12-Bar Blues                | I I I I IV IV I I V IV I I            | Blues       |
| rock-majors            | Rock Majors                | I IV V                                | Rock        |
| rock-majors-rotation   | Rock Majors Rotation       | V IV I                                | Rock        |
| rock-n-roll            | Rock 'n Roll               | I IV V I                              | Rock        |
| andalusian-cadence     | Andalusian Cadence         | vi V IV iii                           | Flamenco    |
| andalusian-cadence-major | Andalusian Cadence (Major) | I vii° vi V                         | Flamenco    |
| canon-in-d             | Canon in D                 | I V vi iii                            | Classical   |
| royal-road             | Royal Road                 | IV V iii vi                           | J-Pop       |

### Genre list

Derived at module level: `['Pop','Alternative','Britpop','Folk','Oldies','Jazz','Blues','Rock','Flamenco','Classical','J-Pop']`

---

## Music theory utilities (`src/utils/music.ts`)

### Keys

12 chromatic keys using conventional sharp/flat spellings for ukulele:

```
C  Db  D  Eb  E  F  F#  G  Ab  A  Bb  B
```

### Numeral resolution

Each Roman numeral maps to a semitone offset from the root and a chord-quality
suffix:

| Numeral | Semitones | Suffix |
| ------- | --------- | ------ |
| I       | 0         | (none) |
| ii      | 2         | m      |
| iii     | 4         | m      |
| IV      | 5         | (none) |
| V       | 7         | (none) |
| vi      | 9         | m      |
| vii°    | 11        | dim    |
| I7      | 0         | 7      |
| ii7     | 2         | m7     |
| IV7     | 5         | 7      |
| V7      | 7         | 7      |
| vi7     | 9         | m7     |

### Functions

- `resolveNumeral(key, numeral)` — returns concrete chord name string.
- `resolveProgression(key, numerals)` — maps an array of numerals to chord
  name strings.
- `pickRandom(array)` — returns a random element.

### Coverage gaps

Not every resolved chord name has a matching entry in the chord library.
When `findChord()` returns `undefined`, screens render the chord name as
plain text without a diagram. This is expected for v1 — the library covers
the most common voicings and can be expanded later.
