import { ZoomableChordDiagram } from "@/src/components/ZoomableChordDiagram";
import { colors, radii, spacing } from "@/src/theme";
import { useChordLookup } from "@/src/tuning";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NextArticleLink } from "./NextArticleLink";

type ChordInfo = {
  name: string;
  headline: string;
  desc: string;
};

const CORE_6: ChordInfo[] = [
  {
    name: "C",
    headline: "C major",
    desc: "Bright and resolved. One finger: ring finger on the A string, 3rd fret. Foundation of most beginner songs.",
  },
  {
    name: "G",
    headline: "G major",
    desc: 'Bright with tension. Wants to resolve back to C. Heard in "Hey Soul Sister," "I\'m Yours," "Stand By Me."',
  },
  {
    name: "D",
    headline: "D major",
    desc: 'Punchy and energetic. Opens up the key of G alongside Em. Common in folk and country. Heard in "Sweet Home Alabama."',
  },
  {
    name: "Em",
    headline: "E minor (Em)",
    desc: 'Dark and expressive. Pairs with G and C in most minor-feel progressions. Heard in "Mad World," "Losing My Religion."',
  },
  {
    name: "Am",
    headline: "A minor (Am)",
    desc: 'Melancholy and versatile. One finger. The vi chord in C. Heard in "Somewhere Over the Rainbow" and most pop ballads.',
  },
  {
    name: "F",
    headline: "F major",
    desc: 'Warm and full. Two fingers: worth the extra practice. The chord that makes progressions feel complete. Heard in "Riptide" and "La Vie en Rose."',
  },
];

const BONUS_4: ChordInfo[] = [
  {
    name: "A",
    headline: "A major",
    desc: 'Bright and punchy. Opens up the key of D. Heard in "Twist and Shout" and "Brown Eyed Girl."',
  },
  {
    name: "Dm",
    headline: "D minor (Dm)",
    desc: "Sad and slightly tense. Pairs naturally with F and C. Common in bossa nova and classical-feel songs.",
  },
  {
    name: "Bb",
    headline: "B♭ major (Bb)",
    desc: 'Rich and full. A barre chord: index finger across the 1st fret. Heard in "La Bamba" and soul progressions.',
  },
  {
    name: "E",
    headline: "E major",
    desc: "The challenge chord. Tricky fingering on ukulele. Come back to it once the others feel solid. It unlocks blues and rock in E.",
  },
];

function ChordCard({ info }: { info: ChordInfo }) {
  const { findChord } = useChordLookup();
  const chord = findChord(info.name);

  return (
    <View style={styles.chordCard}>
      <Text style={styles.chordHeadline}>{info.headline}</Text>
      <Text style={styles.chordDesc}>{info.desc}</Text>
      {chord && (
        <View style={styles.diagramWrapper}>
          <ZoomableChordDiagram chord={chord} width={140} />
        </View>
      )}
    </View>
  );
}

function KeyCard({ keyName, chords, desc }: { keyName: string; chords: string; desc: string }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.keyCard}
      onPress={() => router.push(`/key?key=${keyName}`)}
      activeOpacity={0.7}
    >
      <View style={styles.keyCardHeader}>
        <Text style={styles.keyCardTitle}>Key of {keyName}</Text>
        <Text style={styles.keyCardArrow}>›</Text>
      </View>
      <Text style={styles.keyCardChords}>{chords}</Text>
      <Text style={styles.keyCardDesc}>{desc}</Text>
    </TouchableOpacity>
  );
}

export function BeginnerChords() {
  return (
    <View>
      <Text style={styles.body}>
        Most popular music runs on a surprisingly small number of chords. Learn 6, and you can play hundreds of songs. That's not marketing; it's data.
      </Text>

      <View style={styles.callout}>
        <Text style={styles.calloutText}>
          An analysis of 500,000+ songs found that 6 chords — C, G, Am, F, D, and Em — unlock more songs than any other combination. The Axis of Awesome played 40+ chart hits back to back using 4 of them.
        </Text>
      </View>

      <Text style={styles.body}>
        Once you know these chords, you're not learning songs in isolation. You're learning the patterns that underlie all of them.
      </Text>

      <Text style={styles.sectionTitle}>Core 6</Text>
      <Text style={styles.sectionSubtitle}>
        The highest-reach chords, fastest. Learn these first.
      </Text>

      <View style={styles.chordList}>
        {CORE_6.map((info) => (
          <ChordCard key={info.name} info={info} />
        ))}
      </View>

      <Text style={styles.sectionTitle}>A note on keys</Text>
      <Text style={styles.body}>
        Chords belong to keys. The key tells you which chords naturally sound good together. The Core 6 cover the two most beginner-friendly keys on ukulele. Tap either one to explore.
      </Text>

      <View style={styles.keyList}>
        <KeyCard
          keyName="C"
          chords="C · Am · F · G · Em · Dm"
          desc="The easiest key to start with. Open chords, no awkward shapes. Most beginner songs live here."
        />
        <KeyCard
          keyName="G"
          chords="G · Em · C · D · Am · Bm"
          desc="A natural next step. Shares C and Am with the key of C, so the transition is smooth."
        />
      </View>

      <Text style={styles.sectionTitle}>Bonus 4</Text>
      <Text style={styles.sectionSubtitle}>
        Once the Core 6 feel comfortable, these open new keys and styles.
      </Text>

      <View style={styles.chordList}>
        {BONUS_4.map((info) => (
          <ChordCard key={info.name} info={info} />
        ))}
      </View>

      <Text style={[styles.body, { marginTop: spacing.lg }]}>
        Take these in order. Most people are surprised how many songs click into place once F feels comfortable. The Bonus 4 are there when you're ready to push further.
      </Text>

      <NextArticleLink href="/(tabs)/chords" title="Chord Library" label="Browse" />
      <NextArticleLink slug="strumming-patterns" title="Strumming Patterns" />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: 14,
    color: colors.text,
    fontFamily: "monospace",
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  callout: {
    backgroundColor: colors.bgAlt,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    borderRadius: radii.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  calloutText: {
    fontSize: 13,
    color: colors.text,
    fontFamily: "monospace",
    lineHeight: 20,
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text,
    fontFamily: "monospace",
    marginTop: spacing.xl,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: "monospace",
    lineHeight: 19,
    marginBottom: spacing.md,
  },
  chordList: {
    gap: spacing.md,
  },
  chordCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
  },
  chordHeadline: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
    fontFamily: "monospace",
    marginBottom: spacing.xs,
  },
  chordDesc: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: "monospace",
    lineHeight: 19,
    marginBottom: spacing.xs,
  },
  diagramWrapper: {
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  keyList: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  keyCard: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
  },
  keyCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  keyCardTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.primaryContent,
    fontFamily: "monospace",
  },
  keyCardArrow: {
    fontSize: 20,
    color: colors.primaryContent,
    fontFamily: "monospace",
  },
  keyCardChords: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
    fontFamily: "monospace",
    marginBottom: spacing.xs,
  },
  keyCardDesc: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: "monospace",
    lineHeight: 18,
    fontStyle: "italic",
  },
});
