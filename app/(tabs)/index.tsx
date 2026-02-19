import { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions, Image } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenView, Button } from '@/src/ui';
import { ZoomableChordDiagram } from '@/src/components/ZoomableChordDiagram';
import { progressions } from '@/src/data/progressions';
import { findChord, applyVoicing } from '@/src/data/chords';
import {
  ALL_KEYS,
  NATURAL_KEYS,
  resolveProgression,
  numeralDegree,
  pickRandom,
} from '@/src/utils/music';
import type { Key } from '@/src/utils/music';
import { loadSelectedKeys, saveSelectedKeys, loadVoicingPrefs, loadStarredProgs, saveStarredProgs } from '@/src/storage';
import { trackEvent } from '@/src/analytics';
import type { VoicingPrefs } from '@/src/storage';
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

function pickKeyFromPool(pool: readonly Key[], avoid?: Key): Key {
  if (pool.length === 0) return pickRandom(ALL_KEYS);
  if (pool.length === 1) return pool[0];
  let next: Key;
  do {
    next = pickRandom(pool);
  } while (next === avoid);
  return next;
}

function getInitialState() {
  const prog = pickRandom(progressions);
  const key = pickKeyFromPool(NATURAL_KEYS);
  return { prog, key, selectedKeys: [...NATURAL_KEYS] as Key[], starredOnly: false };
}

export default function HomeScreen() {
  const [state, setState] = useState(getInitialState);
  const [voicingPrefs, setVoicingPrefs] = useState<VoicingPrefs>({});
  const [starredProgs, setStarredProgs] = useState<string[]>([]);

  useEffect(() => {
    loadSelectedKeys().then((stored) => {
      if (stored != null) {
        setState((prev) => ({
          ...prev,
          selectedKeys: stored,
          key: pickKeyFromPool(stored.length > 0 ? stored : ALL_KEYS),
        }));
      }
    });
  }, []);

  useFocusEffect(useCallback(() => {
    loadVoicingPrefs().then(setVoicingPrefs);
    loadStarredProgs().then(setStarredProgs);
  }, []));

  const toggleStarProg = useCallback(() => {
    const id = state.prog.id;
    setStarredProgs((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveStarredProgs(next);
      return next;
    });
  }, [state.prog.id]);

  const toggleStarredOnly = useCallback(() => {
    setState((prev) => ({ ...prev, starredOnly: !prev.starredOnly }));
  }, []);

  const shuffle = useCallback(() => {
    trackEvent('shuffle');
    setState((prev) => {
      const progPool =
        prev.starredOnly && starredProgs.length > 0
          ? progressions.filter((p) => starredProgs.includes(p.id))
          : progressions;
      const keyPool = prev.selectedKeys.length > 0 ? prev.selectedKeys : [...ALL_KEYS];
      return {
        ...prev,
        prog: pickRandom(progPool),
        key: pickKeyFromPool(keyPool, prev.key),
      };
    });
  }, [starredProgs]);

  const toggleKey = useCallback((k: Key) => {
    setState((prev) => {
      const has = prev.selectedKeys.includes(k);
      const next = has
        ? prev.selectedKeys.filter((x) => x !== k)
        : [...prev.selectedKeys, k];
      saveSelectedKeys(next);

      let newKey = prev.key;
      if (!has) {
        // Toggling ON → switch display to that key
        newKey = k;
      } else if (prev.key === k) {
        // Toggling OFF the current key → pick from remaining
        newKey = pickKeyFromPool(next.length > 0 ? next : [...ALL_KEYS]);
      }

      return { ...prev, selectedKeys: next, key: newKey };
    });
  }, []);

  const toggleFilter = useCallback(() => {
    setState((prev) => {
      const next = prev.selectedKeys.length > 0 ? [] : [...NATURAL_KEYS];
      saveSelectedKeys(next);
      const pool = next.length > 0 ? next : [...ALL_KEYS];
      return {
        ...prev,
        selectedKeys: next as Key[],
        key: pickKeyFromPool(pool, prev.key),
      };
    });
  }, []);

  const { width: screenWidth } = useWindowDimensions();
  const horizontalPadding = spacing.lg; // 24
  const gap = spacing.sm; // 8
  const cardWidth = Math.floor((screenWidth - horizontalPadding * 2 - gap * 3) / 4);

  const { prog, key, selectedKeys, starredOnly } = state;
  const isStarred = starredProgs.includes(prog.id);
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
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
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
            <TouchableOpacity onPress={toggleStarProg} style={styles.starProgBtn} activeOpacity={0.7}>
              <Text style={[styles.starProgText, isStarred && styles.starProgActive]}>
                {isStarred ? '\u2605' : '\u2606'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.keyLabel}>Key of {key}</Text>
        </View>

        {/* Chord cards — full width, left-aligned like title */}
        <View style={styles.chordRow}>
          {chordNames.map((name, i) => {
            const numeral = prog.numerals[i];
            const degree = numeralDegree(numeral);
            const borderColor = DEGREE_COLORS[degree];
            const rawChord = findChord(name);
            const chord = rawChord ? applyVoicing(rawChord, voicingPrefs[rawChord.name] ?? 0) : undefined;

            return (
              <View key={`${name}-${i}`} style={[styles.chordCard, { flexBasis: cardWidth }]}>
                {chord ? (
                  <ZoomableChordDiagram
                    chord={chord}
                    width={cardWidth - spacing.xs * 2 - 3}
                    numeral={numeral}
                    degreeColor={borderColor}
                  />
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
        <View style={styles.shuffleRow}>
          <Button
            label="Shuffle"
            onPress={shuffle}
            variant="primary"
            style={styles.shuffleBtn}
          />
          <TouchableOpacity
            onPress={toggleStarredOnly}
            activeOpacity={0.7}
            style={[styles.starFilterBtn, starredOnly && styles.starFilterBtnActive]}
          >
            <Text style={[styles.starFilterText, starredOnly && styles.starFilterTextActive]}>
              {starredOnly ? '\u2605' : '\u2606'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyBar}>
          {KEY_BAR_ITEMS.map((item) => {
            const isActive = selectedKeys.includes(item.key);
            if (item.type === 'sharp') {
              return (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => toggleKey(item.key)}
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
                onPress={() => toggleKey(item.key)}
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
            onPress={toggleFilter}
            activeOpacity={0.7}
            style={styles.keyRefresh}
          >
            <Ionicons
              name={selectedKeys.length > 0 ? 'filter' : 'filter-outline'}
              size={18}
              color={colors.textMuted}
            />
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
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  headerSpacer: {
    width: 24,
  },
  logo: {
    width: 40,
    height: 40,
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
    marginBottom: spacing.lg,
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
    marginTop: spacing.xs,
  },
  chordRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chordCard: {
    flexGrow: 0,
    flexShrink: 0,
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
    marginTop: spacing.sm,
  },
  numeralBadge: {
    backgroundColor: colors.bg,
    borderRadius: radii.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginTop: spacing.sm,
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
  shuffleRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  shuffleBtn: {
    flex: 1,
    height: BAR_HEIGHT,
    borderRadius: radii.full,
  },
  starFilterBtn: {
    width: BAR_HEIGHT,
    height: BAR_HEIGHT,
    borderRadius: radii.full,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starFilterBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.accent,
  },
  starFilterText: {
    fontSize: 20,
    color: colors.textMuted,
  },
  starFilterTextActive: {
    color: colors.primaryContent,
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
  starProgBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starProgText: {
    fontSize: 24,
    color: colors.textMuted,
  },
  starProgActive: {
    color: colors.primary,
  },
});
