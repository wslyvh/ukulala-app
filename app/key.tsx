import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { ScreenView } from '@/src/ui';
import { ZoomableChordDiagram } from '@/src/components/ZoomableChordDiagram';
import { useTuning, useChordLookup } from '@/src/tuning';
import { loadVoicingPrefs } from '@/src/storage';
import type { VoicingPrefs } from '@/src/storage';
import { ALL_KEYS, resolveNumeral, numeralDegree } from '@/src/utils/music';
import type { Key } from '@/src/utils/music';
import type { Numeral } from '@/src/data/progressions';
import { colors, spacing, radii } from '@/src/theme';

const DEGREES: Numeral[] = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

const DEGREE_COLORS: Record<number, string> = {
  1: colors.degree1,
  2: colors.degree2,
  3: colors.degree3,
  4: colors.degree4,
  5: colors.degree5,
  6: colors.degree6,
  7: colors.degree7,
};

export default function KeyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ key: string }>();
  const { tuning } = useTuning();
  const { findChord, applyVoicing } = useChordLookup();
  const { width: screenWidth } = useWindowDimensions();

  const initialKey = (ALL_KEYS.includes(params.key as Key) ? params.key : 'C') as Key;
  const [selectedKey, setSelectedKey] = useState<Key>(initialKey);
  const [voicingPrefs, setVoicingPrefs] = useState<VoicingPrefs>({});

  useFocusEffect(useCallback(() => {
    loadVoicingPrefs(tuning).then(setVoicingPrefs);
  }, [tuning]));

  const horizontalPadding = spacing.lg;
  const gap = spacing.sm;
  const cardWidth = Math.floor((screenWidth - horizontalPadding * 2 - gap * 3) / 4);

  return (
    <ScreenView>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerTitle}>Key of {selectedKey}</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Text style={styles.closeBtnText}>x</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Key picker */}
        <View style={styles.keyGrid}>
          {ALL_KEYS.map((k) => (
            <TouchableOpacity
              key={k}
              onPress={() => setSelectedKey(k)}
              style={[styles.keyBtn, selectedKey === k && styles.keyBtnActive]}
              activeOpacity={0.7}
            >
              <Text style={[styles.keyBtnText, selectedKey === k && styles.keyBtnTextActive]}>
                {k}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Diatonic chord grid */}
        <View style={styles.chordGrid}>
          {DEGREES.map((numeral, i) => {
            const chordName = resolveNumeral(selectedKey, numeral);
            const rawChord = findChord(chordName);
            const chord = rawChord
              ? applyVoicing(rawChord, voicingPrefs[rawChord.name] ?? 0)
              : undefined;
            const degreeColor = DEGREE_COLORS[numeralDegree(numeral)];

            return (
              <View key={numeral} style={[styles.chordCard, { flexBasis: cardWidth }]}>
                {chord ? (
                  <ZoomableChordDiagram
                    chord={chord}
                    width={cardWidth - spacing.xs * 2 - 3}
                    numeral={numeral}
                    degreeColor={degreeColor}
                  />
                ) : (
                  <View style={styles.missingChord}>
                    <Text style={styles.missingText}>{chordName}</Text>
                  </View>
                )}
                <View style={[styles.degreeBar, { backgroundColor: degreeColor }]} />
                <View style={styles.numeralBadge}>
                  <Text style={styles.numeralText}>{numeral}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    fontFamily: 'monospace',
  },
  headerRight: {
    width: 24,
    alignItems: 'flex-end',
  },
  closeBtn: {
    width: 24,
    height: 24,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textMuted,
    fontFamily: 'monospace',
    marginTop: -1,
  },
  keyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  keyBtn: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
  },
  keyBtnActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  keyBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    fontFamily: 'monospace',
  },
  keyBtnTextActive: {
    color: colors.card,
  },
  chordGrid: {
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
  missingChord: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
  },
  missingText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textMuted,
    fontFamily: 'monospace',
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
  numeralText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    fontFamily: 'monospace',
  },
});
