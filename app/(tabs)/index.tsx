import { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ScreenView, Button } from '@/src/ui';
import { ChordDiagram } from '@/src/components/ChordDiagram';
import { progressions } from '@/src/data/progressions';
import { findChord } from '@/src/data/chords';
import {
  ALL_KEYS,
  resolveProgression,
  numeralDegree,
  pickRandom,
} from '@/src/utils/music';
import type { Key } from '@/src/utils/music';
import { colors, spacing, radii } from '@/src/theme';

const DEGREE_COLORS: Record<number, string> = {
  1: colors.degree1,
  2: colors.degree2,
  3: colors.degree3,
  4: colors.degree4,
  5: colors.degree5,
  6: colors.degree6,
  7: colors.degree7,
};

type KeyBarItem =
  | { type: 'natural'; key: Key; label: string }
  | { type: 'sharp'; key: Key };

const KEY_BAR_ITEMS: KeyBarItem[] = [
  { type: 'natural', key: 'C', label: 'C' },
  { type: 'sharp', key: 'Db' },
  { type: 'natural', key: 'D', label: 'D' },
  { type: 'sharp', key: 'Eb' },
  { type: 'natural', key: 'E', label: 'E' },
  { type: 'natural', key: 'F', label: 'F' },
  { type: 'sharp', key: 'F#' },
  { type: 'natural', key: 'G', label: 'G' },
  { type: 'sharp', key: 'Ab' },
  { type: 'natural', key: 'A', label: 'A' },
  { type: 'sharp', key: 'Bb' },
  { type: 'natural', key: 'B', label: 'B' },
];

function getInitialState() {
  const prog = pickRandom(progressions);
  const key = pickRandom(ALL_KEYS);
  return { prog, key };
}

export default function HomeScreen() {
  const [state, setState] = useState(getInitialState);

  const shuffleProgression = useCallback(() => {
    setState((prev) => ({ ...prev, prog: pickRandom(progressions) }));
  }, []);

  const setKey = useCallback((k: Key) => {
    setState((prev) => ({ ...prev, key: k }));
  }, []);

  const randomizeKey = useCallback(() => {
    setState((prev) => {
      let next: Key;
      do {
        next = pickRandom(ALL_KEYS);
      } while (next === prev.key);
      return { ...prev, key: next };
    });
  }, []);

  const { prog, key } = state;
  const chordNames = resolveProgression(key, prog.numerals);

  return (
    <ScreenView>
      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header: logo centered, info button right */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={styles.logo}>🐨</Text>
          <View style={styles.headerRight}>
            <Link href="/about" asChild>
              <TouchableOpacity style={styles.infoBtn} activeOpacity={0.7}>
                <Text style={styles.infoBtnText}>i</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Progression title: name + genre, key below */}
        <View style={styles.titleBlock}>
          <View style={styles.titleTopRow}>
            <Text style={styles.progName}>{prog.name}</Text>
            <Text style={styles.genre}>{prog.genre}</Text>
          </View>
          <Text style={styles.keyLabel}>Key of {key}</Text>
        </View>

        {/* Chord cards — full width, left-aligned like title */}
        <View style={styles.chordRow}>
          {chordNames.map((name, i) => {
            const numeral = prog.numerals[i];
            const degree = numeralDegree(numeral);
            const borderColor = DEGREE_COLORS[degree];
            const chord = findChord(name);

            return (
              <View key={`${name}-${i}`} style={styles.chordCard}>
                {chord ? (
                  <ChordDiagram chord={chord} compact />
                ) : (
                  <View style={styles.missingChord}>
                    <Text style={styles.missingText}>{name}</Text>
                  </View>
                )}
                <View style={[styles.degreeBar, { backgroundColor: borderColor }]} />
                <View style={styles.numeralBadge}>
                  <Text style={styles.chordNumeral}>{numeral}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Fixed bottom controls */}
      <View style={styles.bottomBar}>
        <Button
          label="Shuffle"
          onPress={shuffleProgression}
          variant="primary"
          style={styles.shuffleBtn}
        />

        <View style={styles.keyBar}>
          {KEY_BAR_ITEMS.map((item) => {
            const isActive = key === item.key;
            if (item.type === 'sharp') {
              return (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => setKey(item.key)}
                  activeOpacity={0.7}
                  style={[styles.keySharp, isActive && styles.keyItemActive]}
                >
                  <Text
                    style={[
                      styles.keySharpText,
                      isActive && styles.keyTextActive,
                    ]}
                  >
                    #
                  </Text>
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => setKey(item.key)}
                activeOpacity={0.7}
                style={[styles.keyNatural, isActive && styles.keyItemActive]}
              >
                <Text
                  style={[
                    styles.keyNaturalText,
                    isActive && styles.keyTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
          <View style={styles.keySeparator} />
          <TouchableOpacity
            onPress={randomizeKey}
            activeOpacity={0.7}
            style={styles.keyRefresh}
          >
            <Text style={styles.keyRefreshText}>?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenView>
  );
}

const BAR_HEIGHT = 40;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scroll: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  headerSpacer: {
    width: 24,
  },
  logo: {
    fontSize: 40,
    textAlign: 'center',
  },
  headerRight: {
    width: 24,
    alignItems: 'flex-end',
  },
  infoBtn: {
    width: 24,
    height: 24,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  infoBtnText: {
    fontSize: 13,
    fontWeight: '700',
    fontStyle: 'italic',
    color: colors.textMuted,
    fontFamily: 'serif',
  },
  titleBlock: {
    marginBottom: spacing.md,
  },
  titleTopRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  progName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    fontFamily: 'monospace',
  },
  genre: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: 'monospace',
    fontStyle: 'italic',
  },
  keyLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  chordRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chordCard: {
    flexGrow: 1,
    flexBasis: 70,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.xs,
    paddingBottom: spacing.xs,
  },
  degreeBar: {
    height: 3,
    borderRadius: 1.5,
    alignSelf: 'stretch',
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  numeralBadge: {
    backgroundColor: colors.bg,
    borderRadius: radii.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginTop: spacing.xs,
  },
  chordNumeral: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    fontFamily: 'monospace',
  },
  missingChord: {
    width: 62,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missingText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textMuted,
    fontFamily: 'monospace',
  },

  // Fixed bottom
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  shuffleBtn: {
    height: BAR_HEIGHT,
    borderRadius: radii.full,
  },
  keyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: BAR_HEIGHT,
    backgroundColor: colors.card,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.xs,
  },
  keyNatural: {
    flex: 1,
    height: 30,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyNaturalText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    fontFamily: 'monospace',
  },
  keySharp: {
    width: 20,
    height: 24,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keySharpText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    fontFamily: 'monospace',
  },
  keyItemActive: {
    backgroundColor: colors.text,
  },
  keyTextActive: {
    color: colors.card,
  },
  keySeparator: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
    marginHorizontal: spacing.xs,
  },
  keyRefresh: {
    width: 30,
    height: 30,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyRefreshText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textMuted,
    fontFamily: 'monospace',
  },
});
