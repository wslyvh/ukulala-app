import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '@/src/theme';
import { NextArticleLink } from './NextArticleLink';

// Grid uses 4-char columns (symbol + 3 spaces) starting at offset 6.
// Column positions: beat 1=6, +=10, 2=14, +=18, 3=22, +=26, 4=30, +=34
const HEADER = 'Beat: 1   +   2   +   3   +   4   +';

const NOTATION = [
  { symbol: 'p', desc: 'thumb: plucks the G string (lowest pitch)' },
  { symbol: 'i', desc: 'index finger: plucks the C string' },
  { symbol: 'm', desc: 'middle finger: plucks the E string' },
  { symbol: 'a', desc: 'ring finger: plucks the A string (highest pitch)' },
];

type PickPattern = {
  label: string;
  grid: string[];
  body: string[];
};

const PATTERNS: PickPattern[] = [
  {
    label: 'Pattern 1 — Simple arpeggio',
    grid: [
      HEADER,
      '      p       i       m       a   ',
    ],
    body: [
      'One string per beat, low to high: p on beat 1, i on beat 2, m on beat 3, a on beat 4. Then repeat.',
      'This is the foundation. Once it loops smoothly, try a chord change at the top of each bar. It\'ll feel mechanical at first. That\'s fine. Evenness comes with repetition.',
    ],
  },
  {
    label: 'Pattern 2 — Thumb alternation',
    grid: [
      HEADER,
      '      p       p       p       p   ',
      '          i       m       i       m',
    ],
    body: [
      'Thumb holds a steady pulse on every beat. Index and middle alternate on the "and" of each beat. Top row is thumb; bottom row is fingers.',
      'Say it out loud: thumb-and, thumb-and. This creates a bass-treble texture. The thumb anchors the low end while the fingers carry the melody.',
    ],
  },
  {
    label: 'Pattern 3 — Travis style',
    grid: [
      HEADER,
      '      p       p       p       p   ',
      '          i       m       i   m   ',
    ],
    body: [
      'A classic country and folk pattern. Thumb stays on every beat. Index and middle alternate on the upbeats, with middle landing on beat 4 instead of the "and."',
      'That beat-4 pull gives the pattern its forward lean. Listen for it in James Taylor and classic Beatles fingerpicking.',
    ],
  },
];

const TIPS = [
  'Practice on open strings first. Build finger independence before adding chord shapes.',
  'Keep the thumb steady. It\'s the anchor; if the thumb stumbles, everything falls apart.',
  'Use a single chord for a full minute before adding transitions.',
  'Don\'t rush the arpeggio. Even and clean beats fast and sloppy every time.',
  'Patterns 2 and 3 tend to slip at the hand-off between thumb and fingers. Slow it down until the two rows lock together.',
  'Record yourself. Timing errors that feel invisible often become obvious on playback.',
];

function GridBox({ lines }: { lines: string[] }) {
  return (
    <View style={styles.gridBox}>
      {lines.map((line, i) => (
        <Text key={i} style={styles.gridLine}>{line}</Text>
      ))}
    </View>
  );
}

function PatternCard({ pattern }: { pattern: PickPattern }) {
  return (
    <View style={styles.patternCard}>
      <Text style={styles.patternLabel}>{pattern.label}</Text>
      {pattern.body.map((para, i) => (
        <Text key={i} style={styles.patternDesc}>{para}</Text>
      ))}
      <GridBox lines={pattern.grid} />
    </View>
  );
}

export function Fingerpicking() {
  return (
    <View>
      {/* Intro */}
      <Text style={styles.lede}>
        Fingerpicking turns four strings into four voices.
      </Text>
      <Text style={styles.body}>
        Strumming gives you rhythm and chord texture. Fingerpicking gives you melody and rhythm at the same time, each finger independently controlling its own string. It sounds harder than it is. Most patterns start with two or three fingers.
      </Text>

      {/* Notation */}
      <Text style={styles.sectionTitle}>The notation</Text>
      <Text style={styles.body}>
        Each letter stands for a finger of your picking hand:
      </Text>
      <View style={styles.notationList}>
        {NOTATION.map(({ symbol, desc }) => (
          <View key={symbol} style={styles.notationRow}>
            <View style={styles.notationSymbolBox}>
              <Text style={styles.notationSymbol}>{symbol}</Text>
            </View>
            <Text style={styles.notationDesc}>{desc}</Text>
          </View>
        ))}
      </View>

      {/* Hand position */}
      <Text style={styles.sectionTitle}>Hand position</Text>
      <View style={styles.tipList}>
        {[
          'Rest your thumb lightly on or near the G string as a starting position.',
          'Curl your fingers gently over the remaining strings. Not flat, not clawed.',
          'Your wrist stays mostly still; the movement comes from the fingers.',
          'Nails or flesh? Both work. Nails give more volume and brightness; flesh is warmer.',
        ].map((tip, i) => (
          <View key={i} style={styles.tipRow}>
            <Text style={styles.tipBullet}>—</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      {/* Patterns */}
      <Text style={styles.sectionTitle}>Patterns</Text>
      <View style={styles.patternList}>
        {PATTERNS.map((p) => (
          <PatternCard key={p.label} pattern={p} />
        ))}
      </View>

      {/* Tips */}
      <Text style={styles.sectionTitle}>Tips</Text>
      <View style={styles.tipList}>
        {TIPS.map((tip, i) => (
          <View key={i} style={styles.tipRow}>
            <Text style={styles.tipBullet}>—</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      <NextArticleLink href="/(tabs)/progressions" title="Progressions" label="Next" />
    </View>
  );
}

const styles = StyleSheet.create({
  lede: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    fontFamily: 'monospace',
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  body: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'monospace',
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    fontFamily: 'monospace',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  notationList: {
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  notationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  notationSymbolBox: {
    width: 28,
    height: 28,
    borderRadius: radii.sm,
    backgroundColor: colors.bgAlt,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notationSymbol: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.text,
    fontFamily: 'monospace',
  },
  notationDesc: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    fontFamily: 'monospace',
    lineHeight: 19,
  },
  gridBox: {
    backgroundColor: colors.bgAlt,
    borderRadius: radii.sm,
    padding: spacing.md,
    gap: 4,
  },
  gridLine: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: colors.text,
    lineHeight: 18,
  },
  patternList: {
    gap: spacing.md,
  },
  patternCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
  },
  patternLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    fontFamily: 'monospace',
    marginBottom: spacing.xs,
  },
  patternDesc: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: 'monospace',
    lineHeight: 19,
    marginBottom: spacing.sm,
  },
  tipList: {
    gap: spacing.sm,
  },
  tipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tipBullet: {
    fontSize: 14,
    color: colors.textMuted,
    fontFamily: 'monospace',
    lineHeight: 22,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontFamily: 'monospace',
    lineHeight: 22,
  },
});
