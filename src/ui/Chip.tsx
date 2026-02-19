import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, radii, spacing } from "../theme";

type Props = {
  label: string;
  active?: boolean;
  onPress: () => void;
};

export function Chip({ label, active = false, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.chip, active && styles.active]}
    >
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  active: {
    backgroundColor: colors.primary,
    borderColor: colors.accent,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textMuted,
    includeFontPadding: false,
  },
  activeText: {
    color: colors.primaryContent,
  },
});
