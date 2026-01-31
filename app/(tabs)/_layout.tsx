import { Tabs } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { colors } from '@/src/theme';

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={[styles.icon, focused && styles.iconFocused]}>{label}</Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
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
    borderTopColor: colors.border,
    borderTopWidth: 2,
    height: 60,
    paddingBottom: 6,
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
