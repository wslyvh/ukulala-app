import { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ScreenView, Card, Chip } from '@/src/ui';
import { ChordDiagram } from '@/src/components/ChordDiagram';
import { chords, CHORD_CATEGORIES } from '@/src/data/chords';
import type { ChordCategory, ChordData } from '@/src/data/chords';
import { colors, spacing, radii } from '@/src/theme';

export default function ChordsScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ChordCategory | null>(
    null
  );
  const [selected, setSelected] = useState<ChordData | null>(null);

  const filtered = useMemo(() => {
    let result = chords;
    if (activeCategory) {
      result = result.filter((c) => c.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.fullName.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  return (
    <ScreenView>
      <View style={styles.header}>
        <Text style={styles.title}>Chord Library</Text>

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
            onPress={() => setActiveCategory(null)}
          />
          {CHORD_CATEGORIES.map((cat) => (
            <Chip
              key={cat.key}
              label={cat.label}
              active={activeCategory === cat.key}
              onPress={() =>
                setActiveCategory(
                  activeCategory === cat.key ? null : cat.key
                )
              }
            />
          ))}
        </View>
      </View>

      {/* Selected chord detail */}
      {selected && (
        <Card style={styles.detailCard}>
          <TouchableOpacity
            onPress={() => setSelected(null)}
            style={styles.closeBtn}
          >
            <Text style={styles.closeBtnText}>x</Text>
          </TouchableOpacity>
          <View style={styles.detailContent}>
            <ChordDiagram chord={selected} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailName}>{selected.fullName}</Text>
              <Text style={styles.detailCategory}>{selected.category}</Text>
              <Text style={styles.detailFrets}>
                Frets: {selected.frets.join(' ')}
              </Text>
            </View>
          </View>
        </Card>
      )}

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
            onPress={() =>
              setSelected(selected?.name === item.name ? null : item)
            }
            activeOpacity={0.7}
          >
            <ChordDiagram chord={item} compact />
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
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    fontFamily: 'monospace',
    marginBottom: spacing.md,
  },
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
