import { incrementSession } from "@/src/review";
import { SupporterProvider } from "@/src/supporter";
import { TuningProvider } from "@/src/tuning";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  useEffect(() => {
    incrementSession();
  }, []);

  return (
    <SupporterProvider>
      <TuningProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="settings"
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="friends"
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="key"
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="article"
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </TuningProvider>
    </SupporterProvider>
  );
}
