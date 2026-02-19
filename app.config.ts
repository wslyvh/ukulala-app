import type { ExpoConfig } from "expo/config";

const isDev = process.env.APP_ENVIRONMENT === "development";

const config: ExpoConfig = {
  name: isDev ? "Ukulala DEV Build" : "Ukulala",
  slug: "ukulala-app",
  version: "1.0.0",
  orientation: "default",
  icon: "./assets/images/icon.png",
  scheme: isDev ? "ukulalaappdev" : "ukulalaapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    bundleIdentifier: isDev ? "dev.wslyvh.ukulala" : "com.wslyvh.ukulala.app",
    supportsTablet: true,
  },
  android: {
    package: isDev ? "dev.wslyvh.ukulala" : "com.wslyvh.ukulala.app",
    adaptiveIcon: {
      backgroundColor: "#efdfbf",
      foregroundImage: "./assets/images/android-icon-foreground.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#efdfbf",
      },
    ],
    "expo-iap",
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "8498fe35-13c5-4c77-9cb2-abcdfcc49dc6",
    },
  },
  owner: "wslyvh",
};

export default config;
