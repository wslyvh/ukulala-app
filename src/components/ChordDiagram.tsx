import { View, Text, StyleSheet } from 'react-native';
import type { ChordData } from '../data/chords';
import { colors, spacing, radii } from '../theme';

type Props = {
  chord: ChordData;
  /** Compact mode for inline lists */
  compact?: boolean;
};

const STRINGS = 4;
const FRETS_SHOWN = 4;

export function ChordDiagram({ chord, compact = false }: Props) {
  const size = compact ? 'sm' : 'md';
  const s = sizes[size];

  const minFret = Math.min(...chord.frets.filter((f) => f > 0));
  const maxFret = Math.max(...chord.frets);
  // If all frets fit in first 4 frets, start at fret 1. Otherwise offset.
  const startFret = maxFret <= FRETS_SHOWN ? 1 : minFret;
  const isFirstPosition = startFret === 1;

  return (
    <View style={[styles.container, { width: s.width }]}>
      {/* Chord name */}
      <Text style={[styles.chordName, { fontSize: s.nameFontSize }]}>
        {chord.name}
      </Text>

      {/* Fret position indicator */}
      {!isFirstPosition && (
        <Text style={[styles.fretLabel, { left: -s.fretLabelOffset, top: s.fretLabelTop }]}>
          {startFret}fr
        </Text>
      )}

      <View style={{ position: 'relative' }}>
        {/* Open/muted string indicators above nut */}
        <View style={[styles.openRow, { height: s.openRowHeight }]}>
          {chord.frets.map((fret, i) => (
            <View key={i} style={[styles.openCell, { width: s.cellWidth }]}>
              {fret === 0 && (
                <Text style={[styles.openDot, { fontSize: s.openDotSize }]}>o</Text>
              )}
              {fret === -1 && (
                <Text style={[styles.mutedDot, { fontSize: s.openDotSize }]}>x</Text>
              )}
            </View>
          ))}
        </View>

        {/* Nut (thick top line) */}
        {isFirstPosition && <View style={[styles.nut, { width: s.gridWidth }]} />}

        {/* Fretboard grid */}
        <View style={[styles.grid, { width: s.gridWidth }]}>
          {Array.from({ length: FRETS_SHOWN }).map((_, fretIdx) => (
            <View
              key={fretIdx}
              style={[
                styles.fretRow,
                { height: s.fretHeight },
                !isFirstPosition && fretIdx === 0 && styles.firstFretNoNut,
              ]}
            >
              {/* Strings (vertical lines) */}
              {Array.from({ length: STRINGS }).map((_, strIdx) => (
                <View
                  key={strIdx}
                  style={[
                    styles.stringLine,
                    {
                      left: strIdx * s.cellWidth + s.cellWidth / 2,
                      height: s.fretHeight,
                    },
                  ]}
                />
              ))}

              {/* Fret wire (horizontal line at bottom) */}
              <View style={styles.fretWire} />

              {/* Finger dots */}
              {chord.frets.map((fret, strIdx) => {
                const relativeFret = fret - startFret + 1;
                if (relativeFret === fretIdx + 1 && fret > 0) {
                  return (
                    <View
                      key={`dot-${strIdx}`}
                      style={[
                        styles.dot,
                        {
                          width: s.dotSize,
                          height: s.dotSize,
                          borderRadius: s.dotSize / 2,
                          left: strIdx * s.cellWidth + s.cellWidth / 2 - s.dotSize / 2,
                          top: s.fretHeight / 2 - s.dotSize / 2,
                        },
                      ]}
                    >
                      {!compact && chord.fingers[strIdx] > 0 && (
                        <Text style={styles.fingerText}>
                          {chord.fingers[strIdx]}
                        </Text>
                      )}
                    </View>
                  );
                }
                return null;
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const sizes = {
  sm: {
    width: 70,
    nameFontSize: 14,
    openRowHeight: 16,
    openDotSize: 11,
    gridWidth: 60,
    cellWidth: 15,
    fretHeight: 20,
    dotSize: 12,
    fretLabelOffset: 2,
    fretLabelTop: 36,
  },
  md: {
    width: 100,
    nameFontSize: 18,
    openRowHeight: 22,
    openDotSize: 14,
    gridWidth: 84,
    cellWidth: 21,
    fretHeight: 28,
    dotSize: 18,
    fretLabelOffset: 6,
    fretLabelTop: 46,
  },
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: spacing.sm,
  },
  chordName: {
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 2,
    fontFamily: 'monospace',
  },
  fretLabel: {
    position: 'absolute',
    fontSize: 10,
    color: colors.textMuted,
    fontFamily: 'monospace',
  },
  openRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  openCell: {
    alignItems: 'center',
  },
  openDot: {
    fontWeight: '700',
    color: colors.textMuted,
  },
  mutedDot: {
    fontWeight: '700',
    color: colors.mutedString,
  },
  nut: {
    height: 4,
    backgroundColor: colors.nut,
    borderRadius: 1,
  },
  grid: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  fretRow: {
    position: 'relative',
    borderLeftWidth: 0,
  },
  firstFretNoNut: {
    borderTopWidth: 1,
    borderTopColor: colors.fretWire,
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
  dot: {
    position: 'absolute',
    backgroundColor: colors.fingerDot,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fingerText: {
    color: colors.fingerDotText,
    fontSize: 10,
    fontWeight: '700',
  },
});
