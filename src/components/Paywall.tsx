import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Feature = { icon: string; label: string; lib?: "ion" | "mci" };

type Props = {
  visible: boolean;
  onClose: () => void;
  appName?: string;
  tagline?: string;
  features?: Feature[];
  accent?: string;
};

const DEFAULT_FEATURES: Feature[] = [
  { icon: "block-helper", label: "Remove all ads forever", lib: "mci" },
  {
    icon: "cloud-upload-outline",
    label: "Cloud sync across devices",
    lib: "ion",
  },
  { icon: "headset", label: "Priority customer support", lib: "ion" },
];

export function Paywall({
  visible,
  onClose,
  appName = "App",
  tagline = "Get the most out of your experience",
  features = DEFAULT_FEATURES,
  accent = "#a855f7",
}: Props) {
  const [plan, setPlan] = React.useState<"annual" | "monthly">("annual");

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <StatusBar barStyle="light-content" />
      <View style={styles.root}>
        <LinearGradient
          colors={[accent, "#1a0a2e", "#000"]}
          locations={[0, 0.45, 1]}
          style={StyleSheet.absoluteFill}
        />

        <TouchableOpacity
          onPress={onClose}
          style={styles.closeBtn}
          hitSlop={12}
        >
          <Ionicons name="close" size={22} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.crownWrap}>
            <MaterialCommunityIcons name="crown" size={56} color="#fbbf24" />
          </View>

          <Text style={styles.title}>
            Unlock the full{"\n"}
            <Text style={{ color: "#fbbf24" }}>{appName} </Text>
            experience
          </Text>

          <View style={styles.plans}>
            <TouchableOpacity
              onPress={() => setPlan("annual")}
              activeOpacity={0.9}
              style={[
                styles.planRow,
                plan === "annual" && styles.planRowActive,
              ]}
            >
              <View style={styles.bestBadge}>
                <Text style={styles.bestBadgeTxt}>SAVE 67%</Text>
              </View>
              <View style={styles.radioOuter}>
                {plan === "annual" && <View style={styles.radioInner} />}
              </View>
              <View style={styles.planInfo}>
                <Text style={styles.planLabel}>Annual</Text>
                <Text style={styles.planSub}>$3.33 / month</Text>
              </View>
              <View style={styles.planPriceCol}>
                <Text style={styles.planOldPrice}>$119.88</Text>
                <Text style={styles.planPrice}>$39.99</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPlan("monthly")}
              activeOpacity={0.9}
              style={[
                styles.planRow,
                plan === "monthly" && styles.planRowActive,
              ]}
            >
              <View style={styles.radioOuter}>
                {plan === "monthly" && <View style={styles.radioInner} />}
              </View>
              <View style={styles.planInfo}>
                <Text style={styles.planLabel}>Monthly</Text>
                <Text style={styles.planSub}>Billed monthly</Text>
              </View>
              <View style={styles.planPriceCol}>
                <Text style={styles.planPrice}>$9.99</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.features}>
            {features.map((f, i) => (
              <View key={i} style={styles.featureRow}>
                <View style={styles.checkCircle}>
                  <Ionicons name="checkmark" size={14} color="#000" />
                </View>
                <Text style={styles.featureTxt}>{f.label}</Text>
              </View>
            ))}
          </View>
  
          <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.9}>
            <LinearGradient
              colors={["#fbbf24", "#f59e0b"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.ctaTxt}>Continue</Text>
            <Ionicons name="arrow-forward" size={20} color="#000" />
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Restore</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}>·</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Terms</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}>·</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Privacy</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.disclaimer}>
            Auto-renewable subscription. Cancel anytime.
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  closeBtn: {
    position: "absolute",
    top: 60,
    right: 16,
    zIndex: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  scroll: { paddingTop: 100, paddingHorizontal: 24, paddingBottom: 40 },
  crownWrap: {
    alignSelf: "center",
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  subtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  features: { marginTop: 24, gap: 12 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fbbf24",
    alignItems: "center",
    justifyContent: "center",
  },
  featureTxt: { color: "#fff", fontSize: 14, fontWeight: "500", flex: 1 },

  plans: { marginTop: 24, gap: 12 },
  planRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  planRowActive: {
    borderColor: "#fbbf24",
    backgroundColor: "rgba(251,191,36,0.08)",
  },
  planInfo: { flex: 1, gap: 4 },
  planLabel: { color: "#fff", fontSize: 17, fontWeight: "700" },
  planSub: { color: "rgba(255,255,255,0.6)", fontSize: 13 },
  bestBadge: {
    position: "absolute",
    top: -9,
    right: 16,
    backgroundColor: "#fbbf24",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 1,
  },
  bestBadgeTxt: {
    color: "#000",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  planPriceCol: { alignItems: "flex-end" },
  planOldPrice: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
    textDecorationLine: "line-through",
  },
  planPrice: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -1.5,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fbbf24",
  },

  trialBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(251, 191, 36, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(251, 191, 36, 0.3)",
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },
  trialTxt: { color: "#fff", fontSize: 13, flex: 1 },

  ctaBtn: {
    height: 56,
    borderRadius: 14,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    shadowColor: "#fbbf24",
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaTxt: {
    color: "#000",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0.3,
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
  footerLink: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    textDecorationLine: "underline",
  },
  footerDot: { color: "rgba(255,255,255,0.4)", fontSize: 11 },
  disclaimer: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 9,
    textAlign: "center",
    marginTop: 14,
    lineHeight: 12,
  },
});
