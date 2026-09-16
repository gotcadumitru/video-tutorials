import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const RESTAURANT =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80";
const DASHER =
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80";

const STEPS = [
  { icon: "checkmark", label: "Confirmed", state: "done" },
  { icon: "checkmark", label: "Preparing", state: "done" },
  { icon: "car", label: "On the way", state: "active" },
  { icon: "home", label: "Delivered", state: "todo" },
] as const;

const ITEMS = [
  { qty: "1×", name: "Smash Burger Combo", price: "$14.90" },
  { qty: "1×", name: "Truffle Fries", price: "$6.50" },
];

export default function DoorDash() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
          <Text style={styles.headerTitle}>Order Status</Text>
          <Ionicons name="help-circle-outline" size={24} color="#fff" />
        </View>

        <View style={styles.etaZone}>
          <Text style={styles.etaValue}>12 min</Text>
          <Text style={styles.etaLabel}>Estimated arrival · 8:42 PM</Text>
        </View>

        <View style={styles.timeline}>
          {STEPS.map((step, index) => (
            <React.Fragment key={step.label}>
              {index > 0 && (
                <View
                  style={[
                    styles.connector,
                    step.state !== "todo" && styles.connectorDone,
                  ]}
                />
              )}
              <View style={styles.step}>
                <View
                  style={[
                    styles.stepDot,
                    step.state === "done" && styles.stepDone,
                    step.state === "active" && styles.stepActive,
                  ]}
                >
                  <Ionicons
                    name={step.icon}
                    size={14}
                    color={step.state === "todo" ? "#4b5563" : "#fff"}
                  />
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    step.state !== "todo" && styles.stepLabelOn,
                  ]}
                >
                  {step.label}
                </Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        <View style={styles.dasherCard}>
          <Image source={{ uri: DASHER }} style={styles.dasherAvatar} />
          <View style={styles.dasherInfo}>
            <Text style={styles.dasherName}>Marcus is on the way</Text>
            <View style={styles.dasherMeta}>
              <Ionicons name="star" size={12} color="#fbbf24" />
              <Text style={styles.dasherRating}>4.9 · Red Honda Civic</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.contactBtn}>
            <Ionicons name="call" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactBtn}>
            <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Image source={{ uri: RESTAURANT }} style={styles.orderImage} />
            <View style={styles.orderInfo}>
              <Text style={styles.orderName}>Stacked Burger Co.</Text>
              <Text style={styles.orderMeta}>Order #DD-48210</Text>
            </View>
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={20}
              color="#ff3008"
            />
          </View>
          {ITEMS.map((item) => (
            <View key={item.name} style={styles.itemRow}>
              <Text style={styles.itemQty}>{item.qty}</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$24.87</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  header: {
    marginTop: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  etaZone: {
    alignItems: "center",
    marginTop: 34,
    gap: 4,
  },
  etaValue: {
    color: "#fff",
    fontSize: 56,
    fontWeight: "900",
    letterSpacing: -1,
  },
  etaLabel: {
    color: "#9ca3af",
    fontSize: 14,
  },
  timeline: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 4,
  },
  step: {
    alignItems: "center",
    gap: 7,
    width: 68,
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1f1f1f",
    alignItems: "center",
    justifyContent: "center",
  },
  stepDone: {
    backgroundColor: "#ff3008",
  },
  stepActive: {
    backgroundColor: "#ff3008",
    borderWidth: 4,
    borderColor: "rgba(255,48,8,0.3)",
  },
  stepLabel: {
    color: "#6b7280",
    fontSize: 10.5,
    fontWeight: "600",
  },
  stepLabelOn: {
    color: "#fff",
  },
  connector: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#1f1f1f",
    marginBottom: 20,
    marginHorizontal: -8,
  },
  connectorDone: {
    backgroundColor: "#ff3008",
  },
  dasherCard: {
    marginTop: 30,
    backgroundColor: "#161616",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dasherAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  dasherInfo: {
    flex: 1,
    gap: 3,
  },
  dasherName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  dasherMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dasherRating: {
    color: "#9ca3af",
    fontSize: 12,
  },
  contactBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
  },
  orderCard: {
    marginTop: 14,
    backgroundColor: "#161616",
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  orderImage: {
    width: 46,
    height: 46,
    borderRadius: 10,
  },
  orderInfo: {
    flex: 1,
    gap: 2,
  },
  orderName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
  orderMeta: {
    color: "#6b7280",
    fontSize: 12,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemQty: {
    color: "#ff3008",
    fontSize: 13,
    fontWeight: "800",
  },
  itemName: {
    color: "#e5e7eb",
    fontSize: 14,
    flex: 1,
  },
  itemPrice: {
    color: "#9ca3af",
    fontSize: 13,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderTopColor: "#262626",
    paddingTop: 12,
  },
  totalLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
  totalValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
});
