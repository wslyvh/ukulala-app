import { trackEvent } from "@/src/analytics";
import { ChordDiagram } from "@/src/components/ChordDiagram";
import { useTuning, useChordLookup } from "@/src/tuning";
import type { ProgressionData } from "@/src/data/progressions";
import { GENRES, progressions } from "@/src/data/progressions";
import type { VoicingPrefs } from "@/src/storage";
import {
  loadStarredProgs,
  loadVoicingPrefs,
  saveStarredProgs,
} from "@/src/storage";
import { colors, radii, spacing } from "@/src/theme";
import { Card, Chip, ScreenView } from "@/src/ui";
import type { Key } from "@/src/utils/music";
import { ALL_KEYS, resolveProgression } from "@/src/utils/music";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProgressionsScreen() {
  const { tuning } = useTuning();
  const { findChord, applyVoicing } = useChordLookup();
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [selectedProg, setSelectedProg] = useState<ProgressionData | null>(
    null,
  );
  const [selectedKey, setSelectedKey] = useState<Key>("C");
  const [voicingPrefs, setVoicingPrefs] = useState<VoicingPrefs>({});
  const [starredProgs, setStarredProgs] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadVoicingPrefs(tuning).then(setVoicingPrefs);
      loadStarredProgs().then(setStarredProgs);
    }, [tuning]),
  );

  const toggleBookmark = useCallback((id: string) => {
    setStarredProgs((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      saveStarredProgs(next);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    if (showSavedOnly)
      return progressions.filter((p) => starredProgs.includes(p.id));
    if (activeGenre) return progressions.filter((p) => p.genre === activeGenre);
    return progressions;
  }, [activeGenre, showSavedOnly, starredProgs]);

  const resolvedChords = useMemo(() => {
    if (!selectedProg) return [];
    return resolveProgression(selectedKey, selectedProg.numerals);
  }, [selectedProg, selectedKey]);

  return (
    <ScreenView>
      <View style={styles.header}>
        <Text style={styles.title}>Progressions</Text>

        {/* Genre filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipScroll}
        >
          <Chip
            label="All"
            active={activeGenre === null && !showSavedOnly}
            onPress={() => {
              setActiveGenre(null);
              setShowSavedOnly(false);
            }}
          />
          <Chip
            label={showSavedOnly ? "\u2605" : "\u2606"}
            active={showSavedOnly}
            onPress={() => {
              setShowSavedOnly((v) => !v);
              setActiveGenre(null);
            }}
          />
          {GENRES.map((genre) => (
            <Chip
              key={genre}
              label={genre}
              active={!showSavedOnly && activeGenre === genre}
              onPress={() => {
                setShowSavedOnly(false);
                setActiveGenre(activeGenre === genre ? null : genre);
              }}
            />
          ))}
        </ScrollView>
      </View>

      {/* Expanded detail */}
      {selectedProg && (
        <Card style={styles.detailCard}>
          <TouchableOpacity
            onPress={() => setSelectedProg(null)}
            style={styles.closeBtn}
          >
            <Text style={styles.closeBtnText}>x</Text>
          </TouchableOpacity>

          <View style={styles.detailNameRow}>
            <Text style={styles.detailName}>{selectedProg.name}</Text>
            <TouchableOpacity
              onPress={() => toggleBookmark(selectedProg.id)}
              style={styles.bookmarkBtn}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.bookmarkText,
                  starredProgs.includes(selectedProg.id) &&
                    styles.bookmarkActive,
                ]}
              >
                {starredProgs.includes(selectedProg.id) ? "\u2605" : "\u2606"}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.detailDesc}>{selectedProg.description}</Text>

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
                style={[
                  styles.keyBtn,
                  selectedKey === k && styles.keyBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.keyBtnText,
                    selectedKey === k && styles.keyBtnTextActive,
                  ]}
                >
                  {k}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Numerals */}
          <Text style={styles.numerals}>
            {selectedProg.numerals.join(" - ")}
          </Text>

          {/* Chord diagrams */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chordScroll}
          >
            {resolvedChords.map((name, i) => {
              const rawChord = findChord(name);
              if (!rawChord) {
                return (
                  <View key={i} style={styles.missingChord}>
                    <Text style={styles.missingText}>{name}</Text>
                  </View>
                );
              }
              const chord = applyVoicing(
                rawChord,
                voicingPrefs[rawChord.name] ?? 0,
              );
              return <ChordDiagram key={`${name}-${i}`} chord={chord} />;
            })}
          </ScrollView>
        </Card>
      )}

      {/* Progression list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.listItem,
              selectedProg?.id === item.id && styles.listItemActive,
            ]}
            onPress={() => {
              const next = selectedProg?.id === item.id ? null : item;
              setSelectedProg(next);
              if (next)
                trackEvent("progression_view", { progression: next.name });
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
                  <Text
                    style={[
                      styles.bookmarkText,
                      starredProgs.includes(item.id) && styles.bookmarkActive,
                    ]}
                  >
                    {starredProgs.includes(item.id) ? "\u2605" : "\u2606"}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.listItemGenre}>{item.genre}</Text>
            </View>
            <Text style={styles.listItemNumerals}>
              {item.numerals.join(" - ")}
            </Text>
          </TouchableOpacity>
        )}
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
    alignItems: 'center',
  },
  detailCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  closeBtn: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    zIndex: 1,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.textMuted,
    fontFamily: "monospace",
  },
  detailNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  detailName: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
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
  detailDesc: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: "monospace",
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  keyScroll: {
    marginBottom: spacing.sm,
  },
  keyScrollContent: {
    gap: spacing.xs,
  },
  keyBtn: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: radii.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  keyBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.accent,
  },
  keyBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textMuted,
    fontFamily: "monospace",
  },
  keyBtnTextActive: {
    color: colors.primaryContent,
  },
  numerals: {
    fontSize: 14,
    color: colors.textMuted,
    fontFamily: "monospace",
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  chordScroll: {
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  missingChord: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.lg,
  },
  missingText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textMuted,
    fontFamily: "monospace",
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  listItem: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  listItemActive: {
    borderColor: colors.primary,
    backgroundColor: colors.bgAlt,
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
  emptyText: {
    textAlign: "center",
    color: colors.textMuted,
    fontFamily: "monospace",
    marginTop: spacing.xxl,
    fontSize: 14,
  },
});
