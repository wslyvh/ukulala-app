import { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { ScreenView, ScreenHeader, Card, Chip } from '@/src/ui';
import { ZoomableChordDiagram } from '@/src/components/ZoomableChordDiagram';
import { CHORD_CATEGORIES } from '@/src/data/chords';
import type { ChordCategory, ChordData } from '@/src/data/chords';
import { useTuning, useChordLookup } from '@/src/tuning';
import { loadVoicingPrefs, saveVoicingPrefs } from '@/src/storage';
import type { VoicingPrefs } from '@/src/storage';
import { colors, spacing, radii } from '@/src/theme';

export default function ChordsScreen() {
  const { tuning } = useTuning();
  const { chords, getAllVoicings, applyVoicing } = useChordLookup();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ChordCategory | null>(
    null
  );
  const [selected, setSelected] = useState<ChordData | null>(null);
  const [voicingIndex, setVoicingIndex] = useState(0);
  const [voicingPrefs, setVoicingPrefs] = useState<VoicingPrefs>({});

  useFocusEffect(useCallback(() => {
    loadVoicingPrefs(tuning).then(setVoicingPrefs);
    return () => { setSelected(null); };
  }, [tuning]));

  const filtered = useMemo(() => {
    let result = chords;
    if (activeCategory) {
      result = result.filter((c) => c.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q));
    }
    return result;
  }, [search, activeCategory, chords]);

  return (
    <ScreenView>
      <ScreenHeader
        title="Chord Library"
        description="Browse chord shapes, fingerings, and alternate voicings."
      >
        {/* Search */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search chords..."
          placeholderTextColor={colors.textLight}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Category filters */}
        <View style={styles.chipRow}>
          <Chip
            label="All"
            active={activeCategory === null}
            onPress={() => { setActiveCategory(null); setSelected(null); setVoicingIndex(0); }}
          />
          {CHORD_CATEGORIES.map((cat) => (
            <Chip
              key={cat.key}
              label={cat.label}
              active={activeCategory === cat.key}
              onPress={() => {
                setActiveCategory(activeCategory === cat.key ? null : cat.key);
                setSelected(null);
                setVoicingIndex(0);
              }}
            />
          ))}
        </View>
      </ScreenHeader>

      {/* Selected chord detail */}
      {selected && (() => {
        const voicings = getAllVoicings(selected);
        const activeVoicing = voicings[voicingIndex] ?? voicings[0];
        const displayChord: ChordData = {
          ...selected,
          frets: activeVoicing.frets,
          fingers: activeVoicing.fingers,
          barFret: activeVoicing.barFret,
        };
        const hasMultiple = voicings.length > 1;
        const isPreferred = voicingPrefs[selected.name] === voicingIndex;
        const togglePreferred = () => {
          const next = { ...voicingPrefs };
          if (isPreferred) {
            delete next[selected.name];
          } else {
            next[selected.name] = voicingIndex;
          }
          setVoicingPrefs(next);
          saveVoicingPrefs(next, tuning);
        };
        return (
          <Card style={styles.detailCard}>
            <TouchableOpacity
              onPress={() => { setSelected(null); setVoicingIndex(0); }}
              style={styles.closeBtn}
            >
              <Text style={styles.closeBtnText}>x</Text>
            </TouchableOpacity>
            <View style={styles.detailContent}>
              <ZoomableChordDiagram chord={displayChord} />
              <View style={styles.detailInfo}>
                <View style={styles.detailNameRow}>
                  <Text style={styles.detailName}>{selected.fullName}</Text>
                  {hasMultiple && (
                    <TouchableOpacity onPress={togglePreferred} style={styles.starBtn}>
                      <Text style={[styles.starText, isPreferred && styles.starActive]}>
                        {isPreferred ? '\u2605' : '\u2606'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <Text style={styles.detailCategory}>{selected.category}</Text>
                <Text style={styles.detailFrets}>
                  Frets: {activeVoicing.frets.join(' ')}
                </Text>
                {hasMultiple && (
                  <View style={styles.voicingNav}>
                    <TouchableOpacity
                      onPress={() => setVoicingIndex((voicingIndex - 1 + voicings.length) % voicings.length)}
                      style={styles.voicingArrow}
                    >
                      <Text style={styles.voicingArrowText}>‹</Text>
                    </TouchableOpacity>
                    <Text style={styles.voicingIndicator}>
                      {voicingIndex + 1} of {voicings.length}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setVoicingIndex((voicingIndex + 1) % voicings.length)}
                      style={styles.voicingArrow}
                    >
                      <Text style={styles.voicingArrowText}>›</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </Card>
        );
      })()}

      {/* Chord grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.name}
        numColumns={4}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.gridRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.gridItem,
              selected?.name === item.name && styles.gridItemActive,
            ]}
            onPress={() => {
              if (selected?.name === item.name) {
                setSelected(null);
              } else {
                setSelected(item);
                setVoicingIndex(voicingPrefs[item.name] ?? 0);
              }
            }}
            activeOpacity={0.7}
          >
            <ZoomableChordDiagram chord={applyVoicing(item, voicingPrefs[item.name] ?? 0)} compact />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No chords found.</Text>
        }
      />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    fontSize: 15,
    color: colors.text,
    fontFamily: 'monospace',
    marginBottom: spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  closeBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    zIndex: 1,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textMuted,
    fontFamily: 'monospace',
  },
  detailContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  detailInfo: {
    flex: 1,
  },
  detailNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    fontFamily: 'monospace',
  },
  detailCategory: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: 'monospace',
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
  detailFrets: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: 'monospace',
    marginTop: spacing.xs,
  },
  voicingNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  voicingArrow: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  voicingArrowText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    fontFamily: 'monospace',
  },
  starBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starText: {
    fontSize: 22,
    color: colors.textMuted,
  },
  starActive: {
    color: colors.primary,
  },
  voicingIndicator: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: 'monospace',
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  gridRow: {
    justifyContent: 'flex-start',
    gap: spacing.xs,
  },
  gridItem: {
    flex: 1,
    maxWidth: '25%',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
  },
  gridItemActive: {
    backgroundColor: colors.bgAlt,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontFamily: 'monospace',
    marginTop: spacing.xxl,
    fontSize: 14,
  },
});
