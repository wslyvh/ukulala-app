# Ukulala — Screen Specifications

## Navigation structure

Bottom tab bar with 3 tabs:

```
[ Home (~) ]  [ Chords (#) ]  [ Progressions (>) ]
```

Tab bar uses the retro theme: cream background, amber active tint, monospace
labels, thick top border.

---

## 1. Home (index)

**Purpose:** Instantly show a random chord progression so the player can start
practicing without any taps.

### Layout (top to bottom)

1. **Title block**
   - Koala mascot 🐨 emoji (48px) centered above the title.
   - "Ukulala" in large monospace bold (36px).
   - Subtitle "ukulele progression trainer" in muted text.

2. **Progression info card** (`Card` component)
   - Progression name (e.g. "Major 4", "Rock 'n Roll").
   - Key label in accent color (e.g. "Key of G").
   - Roman numerals separated by dashes.
   - Genre in italic muted text.

3. **Chord diagram row**
   - One `ChordDiagram` per chord in the resolved progression.
   - Wraps to multiple rows if the progression has many chords (e.g. 8-bar
     blues).
   - If a chord isn't in the library, render its name as plain text instead.

4. **Action buttons** (horizontal row)
   - **Shuffle** (primary) — pick a new random progression, keep current key.
   - **Change Key** (outline) — pick a new random key, keep current
     progression.

5. **Description** — short text explaining the progression.

### Behavior

- On first mount, `getInitialState()` picks a random progression and random
  key. This runs once (passed as initializer to `useState`).
- Shuffle always picks a different progression (may be same key).
- Change Key always picks a different key (never same as current).

---

## 2. Chords

**Purpose:** Browse and search the full chord library.

### Layout (top to bottom)

1. **Title** — "Chord Library" (28px monospace bold).

2. **Search bar** — `TextInput` with placeholder "Search chords...",
   filters by chord `name` and `fullName` (case-insensitive substring).

3. **Category filter chips** — horizontal wrap of `Chip` components:
   `All | Major | Minor | 7th | Dim | Aug | Sus | Other`.
   Tapping a chip toggles that filter; tapping the active chip resets to All.

4. **Detail panel** (visible when a chord is selected)
   - Full-size `ChordDiagram` on the left.
   - Full name, category, fret numbers on the right.
   - Close button (x) in top-right corner.

5. **Chord grid** — `FlatList` with `numColumns={4}`.
   - Each cell renders a compact `ChordDiagram`.
   - Tapping a cell opens/closes the detail panel.
   - Active cell has a highlighted border.

### Behavior

- Search and category filter are combined (AND logic).
- Empty state shows "No chords found." centered text.

---

## 3. Progressions

**Purpose:** Browse named progressions and view them in any key.

### Layout (top to bottom)

1. **Title** — "Progressions" (28px monospace bold).

2. **Genre filter chips** — horizontal `ScrollView` of `Chip` components,
   one per unique genre plus "All". Toggle behavior same as Chords screen.

3. **Detail panel** (visible when a progression is selected)
   - Progression name and description.
   - **Key selector** — horizontal `ScrollView` of small key buttons
     (C, Db, D, ... B). Active key is highlighted in primary color.
   - Roman numerals as text.
   - **Chord diagram strip** — horizontal `ScrollView` of `ChordDiagram`
     components for the resolved chords.
   - Close button (x) in top-right corner.

4. **Progression list** — `FlatList` of cards.
   - Each row shows name (left), genre (right italic), and numerals below.
   - Active row has highlighted border.

### Behavior

- Selecting a progression opens the detail panel; selecting it again closes.
- Changing the key in the detail panel re-resolves the numerals to new chord
  names and updates the diagrams.
- Default key when opening detail is C.
