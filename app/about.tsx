import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenView } from '@/src/ui';
import { colors, spacing, radii } from '@/src/theme';

const LINKS = [
  { label: 'Website', url: 'https://www.ukulalala.com' },
  { label: 'GitHub', url: 'https://github.com/wslyvh/ukulala-app' },
  { label: 'Twitter', url: 'https://x.com/wslyvh' },
] as const;

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScreenView>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header: matches home screen layout exactly */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={styles.logo}>🐨</Text>
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

        <Text style={styles.title}>Ukulala</Text>
        <Text style={styles.tagline}>ukulele progression trainer</Text>

        <View style={styles.divider} />

        <Text style={styles.body}>
          A simple, open-source app to learn ukulele chords and practice
          common chord progressions in any key.
        </Text>

        <Text style={styles.body}>
          Built with Expo and React Native. No accounts, no personal data —
          just chords.
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
            <Text style={styles.linkUrl}>{link.url.replace('https://', '')}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.divider} />

        <Text style={styles.footer}>
          Open-source under MIT license.
        </Text>
        <Text style={styles.footerMuted}>
          Made with 🎵 by @wslyvh
        </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  headerSpacer: {
    width: 24,
  },
  logo: {
    fontSize: 40,
    textAlign: 'center',
  },
  headerRight: {
    width: 24,
    alignItems: 'flex-end',
  },
  actionBtn: {
    width: 24,
    height: 24,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textMuted,
    fontFamily: 'monospace',
    marginTop: -1,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  tagline: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    fontFamily: 'monospace',
    marginTop: spacing.xs,
  },
  divider: {
    height: 1.5,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  body: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'monospace',
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    fontFamily: 'monospace',
    marginBottom: spacing.md,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  linkLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'monospace',
  },
  linkUrl: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: 'monospace',
  },
  footer: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  footerMuted: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: 'monospace',
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
