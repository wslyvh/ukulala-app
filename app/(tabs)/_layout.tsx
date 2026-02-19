import { Tabs } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/src/theme';
import { trackPageview } from '@/src/analytics';

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={[styles.icon, focused && styles.iconFocused]}>{label}</Text>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 6);

  return (
    <Tabs
      screenListeners={{
        focus: (e) => {
          const name = e.target?.split('-')[0] ?? '';
          trackPageview(name === 'index' ? '/home' : `/${name}`);
        },
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBar, { height: 54 + bottomPadding, paddingBottom: bottomPadding }],
        tabBarActiveTintColor: colors.primaryContent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon label="~" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="chords"
        options={{
          title: 'Chords',
          tabBarIcon: ({ focused }) => <TabIcon label="#" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="progressions"
        options={{
          title: 'Progressions',
          tabBarIcon: ({ focused }) => (
            <TabIcon label=">" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.bgAlt,
    borderTopWidth: 0,
  },
  tabLabel: {
    fontWeight: '700',
    fontSize: 11,
    fontFamily: 'monospace',
  },
  icon: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'monospace',
    color: colors.textMuted,
  },
  iconFocused: {
    color: colors.primary,
  },
});
