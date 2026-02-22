import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenView, ScreenHeader } from '@/src/ui';
import { articles } from '@/src/content/articles';
import { colors, spacing, radii } from '@/src/theme';

export default function LearnScreen() {
  const router = useRouter();

  return (
    <ScreenView>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Learn" description="Guides to help you get started." />

        <View style={styles.list}>
          {articles.map((article) => (
            <TouchableOpacity
              key={article.slug}
              style={[styles.card, article.comingSoon && styles.cardMuted]}
              onPress={() => {
                if (!article.comingSoon) {
                  router.push(`/article?slug=${article.slug}`);
                }
              }}
              activeOpacity={article.comingSoon ? 1 : 0.7}
            >
              <Text style={[styles.symbol, article.comingSoon && styles.symbolMuted]}>
                {article.symbol}
              </Text>
              <View style={styles.cardBody}>
                <Text style={[styles.cardTitle, article.comingSoon && styles.textMuted]}>
                  {article.title}
                </Text>
                <Text style={[styles.cardDesc, article.comingSoon && styles.textLight]}>
                  {article.description}
                </Text>
              </View>
              <View style={styles.cardRight}>
                {article.comingSoon ? (
                  <Text style={styles.soonBadge}>soon</Text>
                ) : (
                  <Text style={styles.arrow}>›</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: spacing.xxl,
  },
  list: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  cardMuted: {
    opacity: 0.55,
  },
  symbol: {
    fontSize: 20,
    fontFamily: 'monospace',
    color: colors.primary,
    width: 24,
    textAlign: 'center',
  },
  symbolMuted: {
    color: colors.textMuted,
  },
  cardBody: {
    flex: 1,
    gap: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'monospace',
  },
  cardDesc: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  textMuted: {
    color: colors.textMuted,
  },
  textLight: {
    color: colors.textLight,
  },
  cardRight: {
    width: 28,
    alignItems: 'center',
  },
  arrow: {
    fontSize: 20,
    color: colors.textMuted,
    fontFamily: 'monospace',
  },
  soonBadge: {
    fontSize: 9,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: colors.textMuted,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.full,
    paddingHorizontal: 5,
    paddingVertical: 2,
    overflow: 'hidden',
  },
});
