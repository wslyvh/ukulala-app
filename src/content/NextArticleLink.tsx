import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, radii } from '@/src/theme';

type Props = {
  title: string;
  label?: string;
  slug?: string;
  href?: string;
};

export function NextArticleLink({ slug, href, title, label = 'Up next' }: Props) {
  const router = useRouter();

  const handlePress = () => {
    if (slug) {
      router.replace(`/article?slug=${slug}` as any);
    } else if (href) {
      router.navigate(href as any);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    marginTop: spacing.xl,
  },
  label: {
    fontSize: 11,
    color: colors.textMuted,
    fontFamily: 'monospace',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    fontFamily: 'monospace',
  },
  arrow: {
    fontSize: 20,
    color: colors.primaryContent,
    fontFamily: 'monospace',
  },
});
