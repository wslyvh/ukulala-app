import { requestReview } from "@/src/review";
import type { Tuning } from "@/src/storage";
import { colors, radii, spacing } from "@/src/theme";
import { useTuning } from "@/src/tuning";
import { ScreenView } from "@/src/ui";
import { useRouter } from "expo-router";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LINKS = [
  { label: "Website", url: "https://www.ukulalala.com" },
  { label: "GitHub", url: "https://github.com/wslyvh/ukulala-app" },
  { label: "Twitter", url: "https://x.com/wslyvh" },
] as const;

const TUNING_OPTIONS: { value: Tuning; label: string; hint: string }[] = [
  { value: "standard", label: "Ukulele", hint: "GCEA" },
  { value: "baritone", label: "Baritone", hint: "DGBE" },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { tuning, setTuning } = useTuning();

  return (
    <ScreenView>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header: matches home screen layout exactly */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Text style={styles.actionBtnText}>x</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Instrument section */}
        <Text style={styles.sectionTitle}>Instrument</Text>
        <View style={styles.tuningRow}>
          {TUNING_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[
                styles.tuningBtn,
                tuning === opt.value && styles.tuningBtnActive,
              ]}
              onPress={() => setTuning(opt.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tuningLabel,
                  tuning === opt.value && styles.tuningLabelActive,
                ]}
              >
                {opt.label}
              </Text>
              <Text
                style={[
                  styles.tuningHint,
                  tuning === opt.value && styles.tuningHintActive,
                ]}
              >
                {opt.hint}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />

        <Text style={styles.title}>Ukulala</Text>
        <Text style={styles.tagline}>Ukulele chords & progression trainer</Text>

        <View style={styles.divider} />

        <Text style={styles.body}>
          A simple chord and progression trainer to explore your ukulele, get
          inspiration and expand your chord vocabulary.
        </Text>

        <Text style={styles.body}>
          No accounts, no personal data — just music!
        </Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Links</Text>

        {LINKS.map((link) => (
          <TouchableOpacity
            key={link.label}
            style={styles.linkRow}
            onPress={() => Linking.openURL(link.url)}
            activeOpacity={0.7}
          >
            <Text style={styles.linkLabel}>{link.label}</Text>
            <Text style={styles.linkUrl}>
              {link.url.replace("https://", "")}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.linkRow, { borderBottomWidth: 0 }]}
          onPress={() => {
            requestReview();
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.linkLabel}>Rate this app</Text>
          <Text style={styles.rateStar}>★</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footer}>Open-source under MIT license.</Text>
          <Text style={styles.footerMuted}>Made with 🎵 by wslyvh</Text>
        </View>
      </ScrollView>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  headerSpacer: {
    width: 24,
  },
  logo: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  headerRight: {
    width: 24,
    alignItems: "flex-end",
  },
  actionBtn: {
    width: 24,
    height: 24,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.textMuted,
    fontFamily: "monospace",
    marginTop: -1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
    fontFamily: "monospace",
    marginBottom: spacing.md,
  },
  tuningRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  tuningBtn: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  tuningBtnActive: {
    borderColor: colors.primary,
    backgroundColor: colors.bgAlt,
  },
  tuningLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
    fontFamily: "monospace",
  },
  tuningLabelActive: {
    color: colors.primaryContent,
  },
  tuningHint: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: "monospace",
    marginTop: spacing.xs,
  },
  tuningHintActive: {
    color: colors.primaryContent,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: colors.text,
    fontFamily: "monospace",
    textAlign: "center",
  },
  tagline: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    fontFamily: "monospace",
    marginTop: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  body: {
    fontSize: 14,
    color: colors.text,
    fontFamily: "monospace",
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  linkLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    fontFamily: "monospace",
  },
  linkUrl: {
    fontSize: 12,
    color: colors.primaryContent,
    fontFamily: "monospace",
  },
  rateStar: {
    fontSize: 18,
    lineHeight: 18,
    color: colors.primary,
  },
  footerContainer: {
    marginTop: spacing.lg,
  },
  footer: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: "monospace",
    textAlign: "center",
  },
  footerMuted: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: "monospace",
    textAlign: "center",
    marginTop: spacing.xs,
  },
});
