import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function ScreenHeader({ title, description, children }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    fontFamily: 'monospace',
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: 'monospace',
    marginBottom: spacing.md,
  },
});
