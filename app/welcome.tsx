import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTuning } from '@/src/tuning';
import type { Tuning } from '@/src/storage';
import { colors, radii, spacing } from '@/src/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const { setTuning } = useTuning();

  const pick = (t: Tuning) => {
    setTuning(t);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Ukulala</Text>
      <Text style={styles.subtitle}>What do you play?</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btn} onPress={() => pick('standard')} activeOpacity={0.7}>
          <Text style={styles.btnLabel}>Ukulele</Text>
          <Text style={styles.btnHint}>Standard GCEA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => pick('baritone')} activeOpacity={0.7}>
          <Text style={styles.btnLabel}>Baritone</Text>
          <Text style={styles.btnHint}>DGBE tuning</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    fontFamily: 'monospace',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    fontFamily: 'monospace',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  buttons: {
    width: '100%',
    maxWidth: 280,
    gap: spacing.md,
  },
  btn: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  btnLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    fontFamily: 'monospace',
  },
  btnHint: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: 'monospace',
    marginTop: spacing.xs,
  },
});
