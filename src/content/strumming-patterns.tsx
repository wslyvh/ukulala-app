import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '@/src/theme';
import { NextArticleLink } from './NextArticleLink';

// Grid uses 4-char columns (symbol + 3 spaces) starting at offset 6.
// Column positions: beat 1=6, +=10, 2=14, +=18, 3=22, +=26, 4=30, +=34
const HEADER = 'Beat: 1   +   2   +   3   +   4   +';

const NOTATION = [
  { symbol: 'D', desc: 'downstroke: strum top to bottom (G string first)' },
  { symbol: 'U', desc: 'upstroke: strum bottom to top (A string first)' },
  { symbol: 'X', desc: 'chuck: muted strum (see below)' },
  { symbol: '-', desc: 'pause: keep your wrist moving, don\'t strum' },
];

type StrumPattern = {
  label: string;
  grid: string[];
  body: string[];
};

const PATTERNS: StrumPattern[] = [
  {
    label: 'Pattern 1 — All down',
    grid: [
      HEADER,
      '      D       D       D       D   ',
    ],
    body: [
      'One down strum per beat. Slow, deliberate, no frills.',
      'Use this when learning a new chord or practicing transitions. Clean chord changes at slow tempo are the foundation everything else is built on.',
    ],
  },
  {
    label: 'Pattern 2 — Down up',
    grid: [
      HEADER,
      '      D   U   D   U   D   U   D   U',
    ],
    body: [
      'Now add the up strums. Every beat gets a down, every "and" gets an up. Eight strums per bar.',
      'This feels busy at first. Slow it down until each strum is clean and even, then build speed gradually. Your wrist should swing like a pendulum: down on the beat, up on the and.',
    ],
  },
  {
    label: 'Pattern 3 — Folk strum',
    grid: [
      HEADER,
      '      D       D   U   D       D   U',
    ],
    body: [
      'Drop the up strums on beats 1 and 3. The pattern becomes D, D-U, D, D-U. A push-pull feel that sits naturally under most songs.',
      'Say it out loud: down, down-up, down, down-up. The spoken rhythm helps it click faster than counting alone.',
    ],
  },
  {
    label: 'Pattern 4 — Island strum',
    grid: [
      HEADER,
      '      D       D   U       U   D   U',
    ],
    body: [
      'The most popular ukulele pattern. Once this is in your muscle memory, most pop and folk songs are within reach.',
      'Say it: down, down-up, up-down-up. The gap on beat 3 is what gives it the lilting, relaxed feel. Keep your wrist moving through that pause; a ghost strum keeps your timing steady.',
    ],
  },
  {
    label: 'Pattern 5 — Island with chuck',
    grid: [
      HEADER,
      '      D       X   U       U   D   U',
    ],
    body: [
      'The island strum with beat 2 replaced by a chuck (X). That muted hit adds a percussive snap that makes the pattern feel rhythmically alive.',
      'The X lands where your hand would strum down. Rest your palm lightly against the strings as you strum. You\'ll hear a "chk" instead of a chord. Practice the chuck on its own before adding it into the pattern.',
    ],
  },
];

const TIPS = [
  'Start slowly. Speed comes from accuracy, not effort. Halve the tempo until the pattern is clean, then build back up.',
  'Practice on open strings first. Build the muscle memory before adding fretting hand complexity.',
  'Lock in the pattern on one chord before adding changes. Learning a pattern and transitions at the same time slows both down.',
  'Ghost strums keep you honest. On any pause, your wrist still moves. Don\'t make contact with the strings.',
  'Vary your force. Emphasizing certain strums adds expression. Not every strum needs to be the same volume.',
  'Play along with songs. Patterns click fastest when applied to music you already know.',
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

function PatternCard({ pattern }: { pattern: StrumPattern }) {
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

export function StrummingPatterns() {
  return (
    <View>
      {/* Intro */}
      <Text style={styles.lede}>
        The left hand makes the chords. The right hand makes the music.
      </Text>
      <Text style={styles.body}>
        You can know every chord in the library, but without a consistent strum it won't sound like a song. One solid pattern is enough to play hundreds of songs. Find a few that feel natural.
      </Text>

      {/* How to read */}
      <Text style={styles.sectionTitle}>How to read a pattern</Text>
      <Text style={styles.body}>
        A strumming pattern is a sequence of down and up strokes across all strings:
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

      {/* The chuck */}
      <Text style={styles.sectionTitle}>The chuck (X)</Text>
      <Text style={styles.body}>
        A chuck is a muted strum. Instead of letting the strings ring, lightly rest your strumming hand against them as you strum. You get a percussive "chk" sound instead of a chord. It's what gives certain patterns their rhythmic snap.
      </Text>

      {/* Counting beats */}
      <Text style={styles.sectionTitle}>Counting beats</Text>
      <Text style={styles.body}>
        Most songs are in 4/4 time: 4 beats per bar, each beat divided in two. Count it like this:
      </Text>
      <GridBox lines={[
        HEADER,
        '      D       D       D       D   ',
        '          U       U       U       U',
      ]} />
      <Text style={[styles.body, { marginTop: spacing.sm }]}>
        The numbers are the downbeats. The "+"s (said as "and") are the upbeats between them. Down strums land on beats, up strums land on the "and." Once you can feel the 1-2-3-4 pulse, patterns stop being something you memorize and start being something you hear.
      </Text>

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

      <NextArticleLink slug="fingerpicking" title="Fingerpicking Basics" />
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
