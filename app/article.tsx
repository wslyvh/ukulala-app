import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenView } from '@/src/ui';
import { colors, spacing, radii } from '@/src/theme';
import { UkuleleBasics } from '@/src/content/ukulele-basics';
import { ChordDiagrams } from '@/src/content/chord-diagrams';
import { BeginnerChords } from '@/src/content/beginner-chords';
import { StrummingPatterns } from '@/src/content/strumming-patterns';
import { Fingerpicking } from '@/src/content/fingerpicking';

const ARTICLE_COMPONENTS: Record<string, React.ComponentType> = {
  'ukulele-basics': UkuleleBasics,
  'chord-diagrams': ChordDiagrams,
  'beginner-chords': BeginnerChords,
  'strumming-patterns': StrummingPatterns,
  'fingerpicking': Fingerpicking,
};

const ARTICLE_TITLES: Record<string, string> = {
  'ukulele-basics': 'Ukulele Basics',
  'chord-diagrams': 'Reading Chord Diagrams',
  'beginner-chords': 'Beginner Chords',
  'strumming-patterns': 'Strumming Patterns',
  'fingerpicking': 'Fingerpicking Basics',
  'progressions-theory': 'What Are Progressions?',
};

export default function ArticleScreen() {
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const Content = slug ? ARTICLE_COMPONENTS[slug] : undefined;
  const title = slug ? ARTICLE_TITLES[slug] ?? slug : '';

  return (
    <ScreenView>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Text style={styles.closeBtnText}>x</Text>
            </TouchableOpacity>
          </View>
        </View>

        {Content ? (
          <Content />
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Article not found.</Text>
          </View>
        )}

        <View style={styles.footer} />
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
  headerTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    fontFamily: 'monospace',
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  headerRight: {
    width: 24,
    alignItems: 'flex-end',
  },
  closeBtn: {
    width: 24,
    height: 24,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textMuted,
    fontFamily: 'monospace',
    marginTop: -1,
  },
  empty: {
    paddingTop: spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    fontFamily: 'monospace',
  },
  footer: {
    height: spacing.xl,
  },
});
