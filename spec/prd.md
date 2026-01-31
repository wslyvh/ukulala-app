# Ukulala — Product Requirements Document

## Overview

Ukulala is a mobile-first ukulele chord and progression trainer. It helps
beginners and intermediate players learn chords, discover common progressions,
and practice transposing them across all 12 keys.

**Mascot:** the koala 🐨 — displayed as a logo on the home screen.

## Goals

- **Learn chords visually.** Show accurate ukulele fretboard diagrams with
  finger positions for every chord in the library.
- **Practice progressions.** Present named, genre-tagged chord progressions
  (Roman numerals) resolved into concrete chords for a selected key.
- **Randomize for discovery.** The home screen immediately displays a random
  progression in a random key so the player always has something new to try.
- **Stay simple.** No accounts, no backend, no subscription. Everything runs
  locally on the device.

## Non-goals (out of scope)

- Audio playback / metronome.
- User-created or saved progressions.
- Chord recognition via microphone.
- Social features or sharing.
- Dark mode (single retro light theme for v1).

## Target platforms

- iOS, Android, and Web via Expo (React Native).
- Portrait orientation only.

## Tech stack

| Layer        | Choice                          |
| ------------ | ------------------------------- |
| Framework    | Expo SDK 54, React Native 0.81  |
| Language     | TypeScript (strict)             |
| Routing      | Expo Router (file-based, tabs)  |
| Styling      | React Native StyleSheet + tiny custom theme |
| State        | React `useState` / `useMemo` (no external state lib) |
| Data         | Static in-memory arrays (no database) |
| Dependencies | Zero added beyond Expo template defaults |

## Design direction

Warm, vintage "retro" aesthetic inspired by the DaisyUI retro theme:
cream/parchment backgrounds, amber/brown accents, monospace typography,
thick borders, subtle shadows. No heavy UI library — a small `src/theme.ts`
and a handful of reusable primitives in `src/ui/`.

## Success criteria

1. App loads instantly with a random progression on the home screen.
2. User can shuffle progression and change key with one tap each.
3. Chord library is searchable and filterable by category.
4. Progression library lists all entries, filterable by genre, with an
   expandable detail view that shows diagrams in any chosen key.
5. TypeScript compiles with zero errors (`npx tsc --noEmit`).
6. No runtime crashes on web or mobile.
