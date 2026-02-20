import { ZoomableChordDiagram } from "@/src/components/ZoomableChordDiagram";
import { useTuning, useChordLookup } from "@/src/tuning";
import type { ProgressionData } from "@/src/data/progressions";
import { GENRES, progressions } from "@/src/data/progressions";
import type { VoicingPrefs } from "@/src/storage";
import { loadStarredProgs, loadVoicingPrefs, saveStarredProgs } from "@/src/storage";
import { colors, radii, spacing } from "@/src/theme";
import { Chip, ScreenView } from "@/src/ui";
import type { Key } from "@/src/utils/music";
import { ALL_KEYS, resolveProgression, numeralDegree } from "@/src/utils/music";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

const DEGREE_COLORS: Record<number, string> = {
  1: colors.degree1,
  2: colors.degree2,
  3: colors.degree3,
  4: colors.degree4,
  5: colors.degree5,
  6: colors.degree6,
  7: colors.degree7,
};

export default function ProgressionsScreen() {
  const { tuning } = useTuning();
  const { findChord, applyVoicing } = useChordLookup();
  const { width: screenWidth } = useWindowDimensions();
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [selectedProg, setSelectedProg] = useState<ProgressionData | null>(null);
  const [selectedKey, setSelectedKey] = useState<Key>("C");
  const [voicingPrefs, setVoicingPrefs] = useState<VoicingPrefs>({});
  const [starredProgs, setStarredProgs] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadVoicingPrefs(tuning).then(setVoicingPrefs);
      loadStarredProgs().then(setStarredProgs);
      return () => { setSelectedProg(null); };
    }, [tuning]),
  );

  const toggleBookmark = useCallback((id: string) => {
    setStarredProgs((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveStarredProgs(next);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    if (showSavedOnly) return progressions.filter((p) => starredProgs.includes(p.id));
    if (activeGenre) return progressions.filter((p) => p.genre === activeGenre);
    return progressions;
  }, [activeGenre, showSavedOnly, starredProgs]);

  const resolvedChords = useMemo(() => {
    if (!selectedProg) return [];
    return resolveProgression(selectedKey, selectedProg.numerals);
  }, [selectedProg, selectedKey]);

  // Inner content width of listItem (screen - item margins - item padding)
  // Subtract 1 extra px so nested layout rounding never causes the 4th card to wrap
  const innerWidth = screenWidth - spacing.lg * 2 - spacing.md * 2;
  const cardWidth = Math.floor((innerWidth - spacing.xs * 3) / 4) - 1;
  const diagramWidth = cardWidth - spacing.xs * 2 - 3;

  const renderItem = useCallback(({ item }: { item: ProgressionData }) => {
    const isExpanded = selectedProg?.id === item.id;
    const isStarred = starredProgs.includes(item.id);
    const chords = isExpanded ? resolvedChords : [];

    return (
      <View style={[styles.listItem, isExpanded && styles.listItemActive]}>
        {/* Tappable header — always visible */}
        <TouchableOpacity
          onPress={() => {
            const next = isExpanded ? null : item;
            setSelectedProg(next);
          }}
          activeOpacity={0.7}
        >
          <View style={styles.listItemHeader}>
            <View style={styles.listItemNameRow}>
              <Text style={styles.listItemName}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => toggleBookmark(item.id)}
                style={styles.bookmarkBtn}
                activeOpacity={0.7}
              >
                <Text style={[styles.bookmarkText, isStarred && styles.bookmarkActive]}>
                  {isStarred ? "\u2605" : "\u2606"}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.listItemGenre}>{item.genre}</Text>
          </View>
          {!isExpanded && (
            <Text style={styles.listItemNumerals}>{item.numerals.join(" - ")}</Text>
          )}
        </TouchableOpacity>

        {/* Accordion content */}
        {isExpanded && (
          <View style={styles.accordionContent}>
            <Text style={styles.detailDesc}>{item.description}</Text>

            {item.examples && item.examples.length > 0 && (
              <Text style={styles.examples}>♪ {item.examples.join(' · ')}</Text>
            )}

            {/* Key selector */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.keyScroll}
              contentContainerStyle={styles.keyScrollContent}
            >
              {ALL_KEYS.map((k) => (
                <TouchableOpacity
                  key={k}
                  onPress={() => setSelectedKey(k)}
                  style={[styles.keyBtn, selectedKey === k && styles.keyBtnActive]}
                >
                  <Text style={[styles.keyBtnText, selectedKey === k && styles.keyBtnTextActive]}>
                    {k}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Chord grid — negative margin escapes listItem padding, matches home width */}
            <View style={styles.chordRow}>
              {chords.map((name, i) => {
                const numeral = item.numerals[i];
                const degreeColor = DEGREE_COLORS[numeralDegree(numeral)];
                const rawChord = findChord(name);
                if (!rawChord) {
                  return (
                    <View key={i} style={[styles.chordCard, { flexBasis: cardWidth }]}>
                      <Text style={styles.missingText}>{name}</Text>
                    </View>
                  );
                }
                const chord = applyVoicing(rawChord, voicingPrefs[rawChord.name] ?? 0);
                return (
                  <View key={`${name}-${i}`} style={[styles.chordCard, { flexBasis: cardWidth }]}>
                    <ZoomableChordDiagram chord={chord} width={diagramWidth} numeral={numeral} degreeColor={degreeColor} />
                    <View style={[styles.degreeBar, { backgroundColor: degreeColor }]} />
                    <View style={styles.numeralBadge}>
                      <Text style={styles.chordNumeral}>{numeral}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
  }, [selectedProg, selectedKey, starredProgs, resolvedChords, voicingPrefs, cardWidth, diagramWidth, findChord, applyVoicing, toggleBookmark]);

  return (
    <ScreenView>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Progressions</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipScroll}
            >
              <Chip
                label="All"
                active={activeGenre === null && !showSavedOnly}
                onPress={() => { setActiveGenre(null); setShowSavedOnly(false); setSelectedProg(null); }}
              />
              <Chip
                label={showSavedOnly ? "\u2605" : "\u2606"}
                active={showSavedOnly}
                onPress={() => { setShowSavedOnly((v) => !v); setActiveGenre(null); setSelectedProg(null); }}
              />
              {GENRES.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  active={!showSavedOnly && activeGenre === genre}
                  onPress={() => {
                    setShowSavedOnly(false);
                    setActiveGenre(activeGenre === genre ? null : genre);
                    setSelectedProg(null);
                  }}
                />
              ))}
            </ScrollView>
          </View>
        }
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No progressions found.</Text>
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
    fontWeight: "900",
    color: colors.text,
    fontFamily: "monospace",
    marginBottom: spacing.md,
  },
  chipScroll: {
    paddingBottom: spacing.xs,
    alignItems: "center",
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  listItem: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  listItemActive: {
    borderColor: colors.primary,
  },
  listItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  listItemNameRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: spacing.xs,
  },
  listItemName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    fontFamily: "monospace",
  },
  listItemGenre: {
    fontSize: 11,
    color: colors.textLight,
    fontFamily: "monospace",
    fontStyle: "italic",
  },
  listItemNumerals: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: "monospace",
  },
  bookmarkBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  bookmarkText: {
    fontSize: 22,
    color: colors.textMuted,
  },
  bookmarkActive: {
    color: colors.primary,
  },
  accordionContent: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.md,
    paddingTop: spacing.md,
  },
  detailDesc: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: "monospace",
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  examples: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: 'monospace',
    fontStyle: 'italic',
    marginBottom: spacing.md,
  },
  keyScroll: {
    marginBottom: spacing.md,
  },
  keyScrollContent: {
    gap: spacing.xs,
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
    fontWeight: "700",
    color: colors.textMuted,
    fontFamily: "monospace",
  },
  keyBtnTextActive: {
    color: colors.card,
  },
  // Negative margin cancels listItem's padding so chord cards span edge-to-edge
  // and the cardWidth formula matches home exactly
  chordRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  chordCard: {
    flexGrow: 0,
    flexShrink: 0,
    alignItems: "center",
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
    alignSelf: "stretch",
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
    fontWeight: "600",
    color: colors.textMuted,
    fontFamily: "monospace",
  },
  missingText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.textMuted,
    fontFamily: "monospace",
    paddingVertical: spacing.lg,
  },
  emptyText: {
    textAlign: "center",
    color: colors.textMuted,
    fontFamily: "monospace",
    marginTop: spacing.xxl,
    fontSize: 14,
  },
});
