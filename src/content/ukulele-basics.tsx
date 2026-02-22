import { View, Text, StyleSheet } from 'react-native';
import { useTuning } from '@/src/tuning';
import { colors, spacing } from '@/src/theme';
import { TuningCard } from './TuningCard';
import { NextArticleLink } from './NextArticleLink';

const PARTS = [
  { name: 'Headstock', desc: 'The top, where the tuning pegs sit.' },
  { name: 'Tuning pegs', desc: 'Turn these to tune your strings.' },
  { name: 'Nut', desc: 'The small ridge between headstock and neck.' },
  { name: 'Neck', desc: 'The long part you wrap your hand around.' },
  { name: 'Frets', desc: 'Metal bars along the neck. Pressing behind them changes the note.' },
  { name: 'Body', desc: 'The hollow part that produces the sound.' },
  { name: 'Soundhole', desc: 'The round hole the sound comes out of.' },
  { name: 'Bridge', desc: 'At the bottom of the body, where the strings attach.' },
];

const HOLDING_TIPS = [
  'Sit upright. Rest the uke body on your strumming-hand forearm.',
  'Press the body lightly against your chest.',
  'The neck points slightly upward, not drooping down.',
  'Fretting hand thumb sits behind the neck, roughly behind your middle finger.',
  "Keep your fretting wrist low. Don't let it fold up over the neck.",
];

export function UkuleleBasics() {
  const { tuning } = useTuning();

  return (
    <View>
      {/* Parts */}
      <Text style={styles.sectionTitle}>Parts of the ukulele</Text>
      {PARTS.map((part, i) => (
        <View key={part.name} style={[styles.partRow, i < PARTS.length - 1 && styles.partRowBorder]}>
          <Text style={styles.partName}>{part.name}</Text>
          <Text style={styles.partDesc}>{part.desc}</Text>
        </View>
      ))}

      {/* Tuning */}
      <Text style={styles.sectionTitle}>Tuning</Text>
      <Text style={styles.body}>
        Ukulala supports two tunings. Make sure you know which one you're using before you start.
      </Text>

      <TuningCard label="Standard (GCEA)" active={tuning === 'standard'}>
        <View style={styles.tuningTable}>
          <Text style={[styles.tuningRow, tuning === 'standard' && styles.tuningRowActive]}>
            String:  4    3    2    1
          </Text>
          <Text style={[styles.tuningRow, tuning === 'standard' && styles.tuningRowActive]}>
            Note:    G    C    E    A
          </Text>
        </View>
      </TuningCard>
      <Text style={styles.tuningNote}>
        The most common ukulele tuning. If you're not sure which to use, start here.
      </Text>

      <TuningCard label="Baritone (DGBE)" active={tuning === 'baritone'}>
        <View style={styles.tuningTable}>
          <Text style={[styles.tuningRow, tuning === 'baritone' && styles.tuningRowActive]}>
            String:  4    3    2    1
          </Text>
          <Text style={[styles.tuningRow, tuning === 'baritone' && styles.tuningRowActive]}>
            Note:    D    G    B    E
          </Text>
        </View>
      </TuningCard>
      <Text style={styles.tuningNote}>
        Baritone ukuleles are larger and tuned lower. The same chord shapes produce different notes.
      </Text>

      <Text style={[styles.body, { marginTop: spacing.sm }]}>
        All chord diagrams in the app update automatically for the tuning you've selected.
      </Text>

      {/* How to hold it */}
      <Text style={styles.sectionTitle}>How to hold it</Text>
      {HOLDING_TIPS.map((tip, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={styles.bullet}>—</Text>
          <Text style={styles.bulletText}>{tip}</Text>
        </View>
      ))}

      <NextArticleLink slug="chord-diagrams" title="Reading Chord Diagrams" />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    fontFamily: 'monospace',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  body: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'monospace',
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  partRow: {
    paddingVertical: spacing.sm + 2,
  },
  partRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  partName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  partDesc: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: 'monospace',
    lineHeight: 19,
  },
  tuningTable: {
    gap: 2,
  },
  tuningRow: {
    fontSize: 13,
    fontFamily: 'monospace',
    color: colors.textMuted,
  },
  tuningRowActive: {
    color: colors.text,
  },
  tuningNote: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: 'monospace',
    fontStyle: 'italic',
    marginBottom: spacing.md,
    lineHeight: 18,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  bullet: {
    fontSize: 14,
    color: colors.textMuted,
    fontFamily: 'monospace',
    lineHeight: 22,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontFamily: 'monospace',
    lineHeight: 22,
  },
});
