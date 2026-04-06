import { formatPrice, useFriends } from "@/src/friends";
import { colors, radii, spacing } from "@/src/theme";
import { ScreenView } from "@/src/ui";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { PurchasesPackage } from "react-native-purchases";

const PRODUCT_LABELS: Record<string, string> = {
  "ukulala_friends:monthly": "Monthly friend",
  "ukulala_friends:yearly": "Annual friend",
  ukulala_tip: "Friend of Ukulala",
};

const MANAGE_URL = "https://play.google.com/store/account/subscriptions";
const PRIVACY_URL = "https://www.ukulalala.com/privacy";
const TERMS_URL = "https://www.ukulalala.com/terms";

function formatExpiry(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

const PERKS = [
  "Support development of the App",
  "Early access to new features",
  "News & updates from the creator",
];

const PKG_ORDER = ["$rc_monthly", "$rc_annual", "$rc_lifetime"];

type PkgMeta = { label: string; period: string; tag?: string };

const PKG_META: Record<string, PkgMeta> = {
  $rc_monthly: { label: "Monthly", period: "/month" },
  $rc_annual: { label: "Annual", period: "/year" },
  $rc_lifetime: { label: "One-time tip", period: "" },
};

export default function FriendsScreen() {
  const router = useRouter();
  const {
    isFriend,
    isLoaded,
    isLoading,
    packages,
    activeProductId,
    expirationDate,
    purchasePackage,
    restorePurchases,
  } = useFriends();

  const isLifetime = activeProductId === "ukulala_tip";
  const planLabel = activeProductId
    ? (PRODUCT_LABELS[activeProductId] ?? "Friend")
    : "Friend";

  const orderedPackages = PKG_ORDER.map((id) =>
    packages.find((p) => p.identifier === id),
  ).filter(Boolean) as PurchasesPackage[];

  return (
    <ScreenView>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Friends of Ukulala</Text>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.closeBtnText}>x</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {isFriend ? (
          <View style={styles.thankYouBlock}>
            <Text style={styles.thankYouHeading}>
              You're a Friend of Ukulala ❤️
            </Text>
            <Text style={styles.thankYouSub}>
              Thank you for your support. It means a lot and helps keep Ukulala
              free and growing.
            </Text>

            <View style={styles.planCard}>
              <Text style={styles.planLabel}>{planLabel}</Text>
              {!isLifetime && expirationDate ? (
                <Text style={styles.planDetail}>
                  Renews {formatExpiry(expirationDate)}
                </Text>
              ) : (
                <Text style={styles.planDetail}>One-time — no renewal</Text>
              )}
            </View>

            {!isLifetime && (
              <>
                <TouchableOpacity
                  style={styles.manageBtn}
                  onPress={() => Linking.openURL(MANAGE_URL)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.manageBtnText}>
                    Manage subscription →
                  </Text>
                </TouchableOpacity>
                <Text style={styles.cancelNote}>
                  Cancel any time from the Play Store. No questions asked.
                </Text>
              </>
            )}
          </View>
        ) : (
          <>
            <Text style={styles.heading}>Ukulala will always be free.</Text>
            <Text style={styles.body}>
              No ads, no paywalls, no gated chords.{"\n"}
              If you enjoy the app and want to support{"\n"}
              its development, becoming a Friend of{"\n"}
              Ukulala helps keep it alive, updated,{"\n"}
              and growing.
            </Text>

            <View style={styles.perksBlock}>
              {PERKS.map((perk) => (
                <Text key={perk} style={styles.perk}>
                  — {perk}
                </Text>
              ))}
            </View>

            <View style={styles.divider} />

            {!isLoaded ? (
              <ActivityIndicator color={colors.primary} style={styles.loader} />
            ) : (
              <View style={styles.packages}>
                {orderedPackages.map((pkg) => {
                  const meta = PKG_META[pkg.identifier] ?? {
                    label: pkg.identifier,
                    period: "",
                  };
                  const isAnnual = pkg.identifier === "$rc_annual";
                  return (
                    <TouchableOpacity
                      key={pkg.identifier}
                      style={[styles.pkgRow, isAnnual && styles.pkgRowPrimary]}
                      onPress={() => purchasePackage(pkg)}
                      activeOpacity={0.7}
                      disabled={isLoading}
                    >
                      <View style={styles.pkgLeft}>
                        <Text
                          style={[
                            styles.pkgLabel,
                            isAnnual && styles.pkgLabelPrimary,
                          ]}
                        >
                          {meta.label}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.pkgPrice,
                          isAnnual && styles.pkgPricePrimary,
                        ]}
                      >
                        {formatPrice(pkg.product.priceString)}
                        {meta.period}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {isLoaded && (
              <TouchableOpacity
                onPress={restorePurchases}
                activeOpacity={0.7}
                style={styles.restoreRow}
                disabled={isLoading}
              >
                <Text style={styles.restoreText}>Restore purchases</Text>
              </TouchableOpacity>
            )}
          </>
        )}

        <View style={styles.divider} />
        <Text style={styles.footer}>
          No accounts, no personal data — just music!
        </Text>
        <View style={styles.legalLinks}>
          <TouchableOpacity
            onPress={() => Linking.openURL(PRIVACY_URL)}
            activeOpacity={0.7}
          >
            <Text style={styles.legalLinkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.legalLinkSeparator}>•</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(TERMS_URL)}
            activeOpacity={0.7}
          >
            <Text style={styles.legalLinkText}>Terms of Use</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
    fontFamily: "monospace",
  },
  closeBtn: {
    width: 24,
    height: 24,
    borderRadius: radii.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.textMuted,
    fontFamily: "monospace",
    marginTop: -1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  heading: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.text,
    fontFamily: "monospace",
    marginBottom: spacing.md,
  },
  body: {
    fontSize: 14,
    color: colors.text,
    fontFamily: "monospace",
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  perksBlock: {
    gap: spacing.xs,
  },
  perk: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: "monospace",
    lineHeight: 22,
  },
  loader: {
    marginVertical: spacing.xl,
  },
  packages: {
    gap: spacing.sm,
  },
  pkgRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  pkgRowPrimary: {
    borderColor: colors.primary,
    backgroundColor: colors.bgAlt,
  },
  pkgLeft: {
    gap: spacing.xs,
  },
  pkgLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    fontFamily: "monospace",
  },
  pkgLabelPrimary: {
    color: colors.primaryContent,
  },
  pkgTag: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primaryContent,
    fontFamily: "monospace",
  },
  pkgPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    fontFamily: "monospace",
  },
  pkgPricePrimary: {
    color: colors.primaryContent,
  },
  restoreRow: {
    alignItems: "center",
    paddingTop: spacing.md,
  },
  restoreText: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: "monospace",
    textDecorationLine: "underline",
  },
  webNote: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: "monospace",
    textAlign: "center",
    paddingVertical: spacing.lg,
  },
  thankYouBlock: {
    gap: spacing.md,
  },
  thankYouHeading: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.text,
    fontFamily: "monospace",
  },
  thankYouSub: {
    fontSize: 14,
    color: colors.textMuted,
    fontFamily: "monospace",
    lineHeight: 22,
  },
  planCard: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  planLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text,
    fontFamily: "monospace",
  },
  planDetail: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: "monospace",
  },
  manageBtn: {
    paddingVertical: spacing.sm,
  },
  manageBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primaryContent,
    fontFamily: "monospace",
  },
  cancelNote: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: "monospace",
    lineHeight: 18,
  },
  footer: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: "monospace",
    textAlign: "center",
  },
  legalLinks: {
    marginTop: spacing.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
  },
  legalLinkText: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: "monospace",
    textDecorationLine: "underline",
  },
  legalLinkSeparator: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: "monospace",
  },
});
