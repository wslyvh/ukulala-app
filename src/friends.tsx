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
  { identifier: "$rc_monthly", product: { priceString: "€2" } },
  { identifier: "$rc_annual", product: { priceString: "€15" } },
  { identifier: "$rc_lifetime", product: { priceString: "€5" } },
] as unknown as PurchasesPackage[];

export function formatPrice(price: string): string {
  return price.replace(/[.,]00$/, "");
}

type FriendsContextValue = {
  isFriend: boolean;
  isLoaded: boolean;
  isLoading: boolean;
  packages: PurchasesPackage[];
  activeProductId: string | null;
  expirationDate: string | null;
  purchasePackage: (pkg: PurchasesPackage) => Promise<void>;
  restorePurchases: () => Promise<void>;
};

const FriendsContext = createContext<FriendsContextValue>({
  isFriend: false,
  isLoaded: false,
  isLoading: false,
  packages: [],
  activeProductId: null,
  expirationDate: null,
  purchasePackage: async () => { },
  restorePurchases: async () => { },
});

export function FriendsProvider({ children }: { children: React.ReactNode }) {
  const [isFriend, setIsFriend] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [expirationDate, setExpirationDate] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function applyCustomerInfo(customerInfo: any) {
    const entitlement = customerInfo.entitlements.active["friend"];
    setIsFriend(!!entitlement);
    setActiveProductId(entitlement?.productIdentifier ?? null);
    setExpirationDate(entitlement?.expirationDate ?? null);
  }

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
        const apiKey = Platform.OS === "android" ? Constants.expoConfig?.extra?.rcApiKeyAndroid : Constants.expoConfig?.extra?.rcApiKeyIos;
        Purchases.configure({ apiKey });

        const customerInfo = await Purchases.getCustomerInfo();
        applyCustomerInfo(customerInfo);

        const offerings = await Purchases.getOfferings();
        if (offerings.current) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (e) {
        console.warn("[Friends] init error", e);
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
      applyCustomerInfo(customerInfo);
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
      applyCustomerInfo(customerInfo);
      const restored = !!customerInfo.entitlements.active["friend"];
      if (restored) {
        Alert.alert(
          "Restored!",
          "Your friend status has been restored. Thank you! ♥",
        );
      } else {
        Alert.alert(
          "Nothing to restore",
          "No previous friend purchases found.",
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
      isFriend,
      isLoaded,
      isLoading,
      packages,
      activeProductId,
      expirationDate,
      purchasePackage,
      restorePurchases,
    }),
    [
      isFriend,
      isLoaded,
      isLoading,
      packages,
      activeProductId,
      expirationDate,
      purchasePackage,
      restorePurchases,
    ],
  );

  return (
    <FriendsContext.Provider value={value}>
      {children}
    </FriendsContext.Provider>
  );
}

export function useFriends() {
  return useContext(FriendsContext);
}
