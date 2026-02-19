import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { trackPageview } from '@/src/analytics';
import { incrementSession } from '@/src/review';
import { TuningProvider } from '@/src/tuning';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  useEffect(() => {
    incrementSession();
  }, []);

  return (
    <TuningProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenListeners={{
            focus: (e) => {
              const name = e.target?.split('-')[0] ?? '';
              if (name === '(tabs)') return; // tabs track themselves
              trackPageview(`/${name}`);
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="dark" />
      </GestureHandlerRootView>
    </TuningProvider>
  );
}
