import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '@/src/theme';

type Props = {
  label: string;
  active: boolean;
  children: React.ReactNode;
};

export function TuningCard({ label, active, children }: Props) {
  return (
    <View style={[styles.box, active && styles.boxActive]}>
      <View style={styles.header}>
        <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
        {active && <Text style={styles.badge}>selected</Text>}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  boxActive: {
    borderColor: colors.primary,
    backgroundColor: colors.bgAlt,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'monospace',
  },
  labelActive: {
    color: colors.primaryContent,
  },
  badge: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: colors.primaryContent,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.full,
    overflow: 'hidden',
  },
});
