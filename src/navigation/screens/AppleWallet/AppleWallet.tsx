import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function AppleWallet() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Wallet</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={22} color="#0a84ff" />
        </TouchableOpacity>
      </View>

      <View style={styles.stack}>
        <LinearGradient
          colors={["#1e3a8a", "#2563eb"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardTop}>
            <Text style={styles.cardBrand}>Sapphire</Text>
            <MaterialCommunityIcons
              name="contactless-payment"
              size={24}
              color="rgba(255,255,255,0.85)"
            />
          </View>
        </LinearGradient>

        <LinearGradient
          colors={["#2c2c2e", "#48484a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, styles.cardPeek]}
        >
          <View style={styles.cardTop}>
            <Text style={styles.cardBrand}>Transit</Text>
            <MaterialCommunityIcons
              name="train"
              size={22}
              color="rgba(255,255,255,0.85)"
            />
          </View>
        </LinearGradient>

        <LinearGradient
          colors={["#f2f2f7", "#c7c7d1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, styles.cardPeek]}
        >
          <View style={styles.cardTop}>
            <Text style={styles.cardBrandDark}>Apple Card</Text>
            <MaterialCommunityIcons
              name="contactless-payment"
              size={24}
              color="#3a3a3c"
            />
          </View>
          <View style={styles.cardBottom}>
            <Text style={styles.cardNameDark}>DUMITRU GOTCA</Text>
            <Text style={styles.cardNumberDark}>•••• 4821</Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.paySheet}>
        <View style={styles.payStatus}>
          
          <Text style={styles.payStatusText}>Face ID confirmed</Text>
        </View>
        <TouchableOpacity style={styles.doneBtn}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    marginTop: 58,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
  },
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#1c1c1e",
    alignItems: "center",
    justifyContent: "center",
  },
  stack: {
    paddingHorizontal: 22,
    marginTop: 24,
  },
  card: {
    height: 200,
    borderRadius: 18,
    padding: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  cardPeek: {
    marginTop: -138,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardBrand: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  cardBrandDark: {
    color: "#1c1c1e",
    fontSize: 17,
    fontWeight: "700",
  },
  cardBottom: {
    gap: 4,
  },
  cardNameDark: {
    color: "#3a3a3c",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.5,
  },
  cardNumberDark: {
    color: "#1c1c1e",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 2,
  },
  paySheet: {
    marginTop: "auto",
    backgroundColor: "#1c1c1e",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    alignItems: "center",
    paddingTop: 34,
    paddingBottom: 44,
    paddingHorizontal: 22,
  },
  payIconWrap: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "rgba(10,132,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  payTitle: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "700",
    marginTop: 18,
  },
  payStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 10,
  },
  payStatusText: {
    color: "#8e8e93",
    fontSize: 14,
  },
  doneBtn: {
    marginTop: 24,
    backgroundColor: "#0a84ff",
    borderRadius: 24,
    paddingVertical: 13,
    paddingHorizontal: 60,
  },
  doneText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
