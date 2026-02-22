import { View, Text, StyleSheet } from 'react-native';
import { useTuning } from '@/src/tuning';
import { ZoomableChordDiagram } from '@/src/components/ZoomableChordDiagram';
import type { ChordData } from '@/src/data/chords';
import { colors, spacing, radii } from '@/src/theme';
import { TuningCard } from './TuningCard';
import { NextArticleLink } from './NextArticleLink';

// Mirrors ChordDiagram's grid geometry at a fixed width, string names above nut
const DIAGRAM_WIDTH = 160;
const GRID_WIDTH = DIAGRAM_WIDTH * 0.84;
const CELL_WIDTH = DIAGRAM_WIDTH * 0.21;
const FRET_HEIGHT = DIAGRAM_WIDTH * 0.28;
const OPEN_ROW_HEIGHT = DIAGRAM_WIDTH * 0.22;
const FRETS_SHOWN = 4;
const STRINGS = 4;

function AnnotatedDiagram({ stringNames }: { stringNames: string[] }) {
  return (
    <View style={annotated.container}>
      {/* String name labels — positioned like open-string indicators */}
      <View style={[annotated.openRow, { height: OPEN_ROW_HEIGHT, width: GRID_WIDTH }]}>
        {stringNames.map((name, i) => (
          <View key={i} style={[annotated.openCell, { width: CELL_WIDTH }]}>
            <Text style={annotated.stringName}>{name}</Text>
          </View>
        ))}
      </View>

      {/* Nut */}
      <View style={[annotated.nut, { width: GRID_WIDTH }]} />

      {/* Fretboard grid */}
      <View style={{ width: GRID_WIDTH }}>
        {Array.from({ length: FRETS_SHOWN }).map((_, fretIdx) => (
          <View key={fretIdx} style={[annotated.fretRow, { height: FRET_HEIGHT }]}>
            {Array.from({ length: STRINGS }).map((_, strIdx) => (
              <View
                key={strIdx}
                style={[
                  annotated.stringLine,
                  {
                    left: strIdx * CELL_WIDTH + CELL_WIDTH / 2,
                    height: FRET_HEIGHT,
                  },
                ]}
              />
            ))}
            <View style={annotated.fretWire} />
          </View>
        ))}
      </View>
    </View>
  );
}

const C_OPEN: ChordData = {
  name: 'C',
  fullName: 'C Major',
  category: 'major',
  frets: [0, 0, 0, 3],
  fingers: [0, 0, 0, 3],
};

const C_HIGH: ChordData = {
  name: 'C',
  fullName: 'C Major',
  category: 'major',
  frets: [5, 4, 3, 3],
  fingers: [3, 2, 1, 1],
  barFret: 3,
};

const FINGER_KEYS = [
  { num: '1', name: 'index' },
  { num: '2', name: 'middle' },
  { num: '3', name: 'ring' },
  { num: '4', name: 'pinky' },
];

export function ChordDiagrams() {
  const { tuning } = useTuning();
  const isStandard = tuning === 'standard';

  return (
    <View>
      {/* The Diagram */}
      <Text style={styles.sectionTitle}>The diagram</Text>
      <Text style={styles.body}>
        Diagrams are shown for your active tuning. String names update automatically when you switch between tunings.
      </Text>

      <TuningCard label="Standard (GCEA)" active={isStandard}>
        <View style={styles.diagramRow}>
          <AnnotatedDiagram stringNames={['G', 'C', 'E', 'A']} />
        </View>
      </TuningCard>
      <Text style={styles.tuningNote}>
        The most common ukulele tuning.
      </Text>

      <TuningCard label="Baritone (DGBE)" active={!isStandard}>
        <View style={styles.diagramRow}>
          <AnnotatedDiagram stringNames={['D', 'G', 'B', 'E']} />
        </View>
      </TuningCard>
      <Text style={[styles.tuningNote, { marginBottom: spacing.md }]}>
        Baritone ukuleles are larger and tuned lower.
      </Text>

      {/* Legend */}
      <View style={styles.legendBox}>
        <Text style={styles.legendRow}>
          <Text style={styles.legendTerm}>Vertical lines</Text>
          {': '}the 4 strings, labeled left to right for your tuning
        </Text>
        <Text style={styles.legendRow}>
          <Text style={styles.legendTerm}>Horizontal lines</Text>
          {': '}the frets
        </Text>
        <Text style={styles.legendRow}>
          <Text style={styles.legendTerm}>Thick bar at top</Text>
          {': '}the nut. Chords shown from here are played in open position, near the headstock
        </Text>
      </View>

      {/* Dots and Fingers */}
      <Text style={styles.sectionTitle}>Dots and fingers</Text>
      <Text style={styles.body}>
        Dots show you where to press. The number inside tells you which finger to use.
      </Text>
      <View style={styles.fingerList}>
        {FINGER_KEYS.map(({ num, name }) => (
          <View key={num} style={styles.fingerRow}>
            <View style={styles.fingerDot}>
              <Text style={styles.fingerDotText}>{num}</Text>
            </View>
            <Text style={styles.fingerName}>= {name}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.body}>
        <Text style={styles.emphasis}>Open (o)</Text>
        {' '}strings ring without any finger pressed.{' '}
        <Text style={styles.emphasis}>Muted (x)</Text>
        {' '}strings aren't played.
      </Text>

      {/* Fret position */}
      <Text style={styles.sectionTitle}>Fret position</Text>
      <Text style={styles.body}>
        When a chord is played higher up the neck, the nut disappears and a fret marker appears instead.{' '}
        <Text style={styles.emphasis}>3fr</Text> means your first finger starts at the 3rd fret.
      </Text>

      {/* Example */}
      <Text style={styles.sectionTitle}>Example: C Major</Text>
      <Text style={styles.body}>
        The most common voicing uses one finger. Ring finger on the A string, 3rd fret. The other three strings ring open.
      </Text>
      <View style={styles.chordExample}>
        <ZoomableChordDiagram chord={C_OPEN} width={140} />
      </View>

      <Text style={styles.body}>
        But that's not the only way to play it. C major can also be voiced higher up the neck:
      </Text>
      <View style={styles.chordExample}>
        <ZoomableChordDiagram chord={C_HIGH} width={140} />
      </View>

      <Text style={styles.body}>
        Same chord, different feel. The higher voicing is fuller and works well when playing alongside another instrument.
      </Text>
      <Text style={styles.body}>
        The chord library includes alternate voicings for every chord. You can select your preferred voicing and it'll be used as the default across the app.
      </Text>

      <NextArticleLink href="/(tabs)/chords" title="Chord Library" label="Browse" />
      <NextArticleLink slug="beginner-chords" title="Beginner Chords" />
    </View>
  );
}

const annotated = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  openRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  openCell: {
    alignItems: 'center',
  },
  stringName: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: colors.text,
    marginBottom: 3,
  },
  nut: {
    height: 4,
    backgroundColor: colors.nut,
    borderRadius: 1,
  },
  fretRow: {
    position: 'relative',
  },
  stringLine: {
    position: 'absolute',
    top: 0,
    width: 1.5,
    backgroundColor: colors.string,
  },
  fretWire: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: colors.fretWire,
  },
});

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
  emphasis: {
    fontWeight: '700',
    color: colors.primaryContent,
  },
  tuningNote: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: 'monospace',
    fontStyle: 'italic',
    marginBottom: spacing.sm,
    lineHeight: 18,
  },
  diagramRow: {
    alignItems: 'center',
    paddingTop: spacing.xs,
  },
  legendBox: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  legendRow: {
    fontSize: 13,
    color: colors.text,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  legendTerm: {
    fontWeight: '700',
    color: colors.text,
  },
  fingerList: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  fingerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  fingerDot: {
    width: 28,
    height: 28,
    borderRadius: radii.full,
    backgroundColor: colors.fingerDot,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fingerDotText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.fingerDotText,
    fontFamily: 'monospace',
  },
  fingerName: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: colors.text,
  },
  chordExample: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
});
