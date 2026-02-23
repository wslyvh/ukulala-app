import Constants from "expo-constants";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert, Platform } from "react-native";
import type { PurchasesPackage } from "react-native-purchases";

export type { PurchasesPackage };

const MOCK_PACKAGES = [
  { identifier: "$rc_monthly", product: { priceString: "€2000" } },
  { identifier: "$rc_annual", product: { priceString: "€1500" } },
  { identifier: "$rc_lifetime", product: { priceString: "€5000" } },
] as unknown as PurchasesPackage[];

export function formatPrice(price: string): string {
  return price.replace(/[.,]00$/, "");
}

type SupporterContextValue = {
  isSupporter: boolean;
  isLoaded: boolean;
  isLoading: boolean;
  packages: PurchasesPackage[];
  purchasePackage: (pkg: PurchasesPackage) => Promise<void>;
  restorePurchases: () => Promise<void>;
};

const SupporterContext = createContext<SupporterContextValue>({
  isSupporter: false,
  isLoaded: false,
  isLoading: false,
  packages: [],
  purchasePackage: async () => {},
  restorePurchases: async () => {},
});

export function SupporterProvider({ children }: { children: React.ReactNode }) {
  const [isSupporter, setIsSupporter] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);

  useEffect(() => {
    if (Platform.OS === "web") {
      setPackages(MOCK_PACKAGES);
      setIsLoaded(true);
      return;
    }

    async function init() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const Purchases = require("react-native-purchases").default;
        const extra = Constants.expoConfig?.extra as
          | Record<string, string>
          | undefined;
        Purchases.configure({ apiKey: extra?.rcApiKey ?? "" });

        const customerInfo = await Purchases.getCustomerInfo();
        setIsSupporter(!!customerInfo.entitlements.active["friend"]);

        const offerings = await Purchases.getOfferings();
        if (offerings.current) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (e) {
        console.warn("[Supporter] init error", e);
      } finally {
        setIsLoaded(true);
      }
    }

    init();
  }, []);

  const purchasePackage = useCallback(async (pkg: PurchasesPackage) => {
    if (Platform.OS === "web") return;
    setIsLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Purchases = require("react-native-purchases").default;
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      setIsSupporter(!!customerInfo.entitlements.active["friend"]);
    } catch (e: unknown) {
      if (!(e as { userCancelled?: boolean }).userCancelled) {
        Alert.alert(
          "Purchase failed",
          "Something went wrong. Please try again.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const restorePurchases = useCallback(async () => {
    if (Platform.OS === "web") return;
    setIsLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Purchases = require("react-native-purchases").default;
      const customerInfo = await Purchases.restorePurchases();
      const restored = !!customerInfo.entitlements.active["friend"];
      setIsSupporter(restored);
      if (restored) {
        Alert.alert(
          "Restored!",
          "Your supporter status has been restored. Thank you! ♥",
        );
      } else {
        Alert.alert(
          "Nothing to restore",
          "No previous supporter purchases found.",
        );
      }
    } catch {
      Alert.alert("Restore failed", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      isSupporter,
      isLoaded,
      isLoading,
      packages,
      purchasePackage,
      restorePurchases,
    }),
    [
      isSupporter,
      isLoaded,
      isLoading,
      packages,
      purchasePackage,
      restorePurchases,
    ],
  );

  return (
    <SupporterContext.Provider value={value}>
      {children}
    </SupporterContext.Provider>
  );
}

export function useSupporter() {
  return useContext(SupporterContext);
}
