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
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const DRINKS = [
  {
    name: "Caramel Macchiato",
    price: "$5.45",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80",
  },
  {
    name: "Iced Americano",
    price: "$4.25",
    image:
      "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=500&q=80",
  },
  {
    name: "Flat White",
    price: "$4.95",
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&q=80",
  },
];

export default function Starbucks() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning ☀️</Text>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </View>

        <LinearGradient
          colors={["#00754a", "#0d4d33"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.rewardsCard}
        >
          <View style={styles.starsRow}>
            <Ionicons name="star" size={22} color="#cba258" />
            <Text style={styles.starsValue}>372</Text>
            <Text style={styles.starsGoal}>/ 400 Stars</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.rewardHint}>
            28 Stars until your next reward
          </Text>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Order again</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.drinks}
        >
          {DRINKS.map((drink) => (
            <View key={drink.name} style={styles.drinkCard}>
              <Image source={{ uri: drink.image }} style={styles.drinkImage} />
              <Text style={styles.drinkName}>{drink.name}</Text>
              <View style={styles.drinkFooter}>
                <Text style={styles.drinkPrice}>{drink.price}</Text>
                <TouchableOpacity style={styles.addBtn}>
                  <Ionicons name="add" size={16} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.pickupCard}>
          <MaterialCommunityIcons name="storefront" size={26} color="#00a862" />
          <View style={styles.pickupInfo}>
            <Text style={styles.pickupTitle}>Pine & 5th Ave</Text>
            <Text style={styles.pickupMeta}>Open until 9 PM · 0.3 mi</Text>
          </View>
          <TouchableOpacity style={styles.orderBtn}>
            <Text style={styles.orderText}>Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Ionicons name="home" size={23} color="#00a862" />
          <Text style={[styles.tabLabel, styles.tabLabelOn]}>Home</Text>
        </View>
        <View style={styles.tabItem}>
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={22}
            color="#8e8e93"
          />
          <Text style={styles.tabLabel}>Scan</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="cafe-outline" size={23} color="#8e8e93" />
          <Text style={styles.tabLabel}>Order</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="gift-outline" size={23} color="#8e8e93" />
          <Text style={styles.tabLabel}>Gift</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="pricetag-outline" size={23} color="#8e8e93" />
          <Text style={styles.tabLabel}>Offers</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0d130f",
  },
  scroll: {
    paddingBottom: 110,
  },
  header: {
    marginTop: 58,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
  rewardsCard: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    gap: 12,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
  },
  starsValue: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 32,
  },
  starsGoal: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 3,
  },
  progressTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.3)",
    overflow: "hidden",
  },
  progressFill: {
    width: "93%",
    height: "100%",
    borderRadius: 4,
    backgroundColor: "#cba258",
  },
  rewardHint: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "600",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 28,
    marginHorizontal: 20,
  },
  drinks: {
    paddingHorizontal: 20,
    paddingTop: 14,
    gap: 14,
  },
  drinkCard: {
    width: 150,
    backgroundColor: "#16201a",
    borderRadius: 18,
    padding: 10,
    gap: 8,
  },
  drinkImage: {
    width: "100%",
    height: 110,
    borderRadius: 12,
  },
  drinkName: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  drinkFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  drinkPrice: {
    color: "#8fbca6",
    fontSize: 13,
    fontWeight: "700",
  },
  addBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#00a862",
    alignItems: "center",
    justifyContent: "center",
  },
  pickupCard: {
    marginTop: 26,
    marginHorizontal: 20,
    backgroundColor: "#16201a",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  pickupInfo: {
    flex: 1,
    gap: 2,
  },
  pickupTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  pickupMeta: {
    color: "#8e8e93",
    fontSize: 13,
  },
  orderBtn: {
    backgroundColor: "#00a862",
    borderRadius: 18,
    paddingVertical: 9,
    paddingHorizontal: 18,
  },
  orderText: {
    color: "#000",
    fontSize: 13,
    fontWeight: "800",
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#0d130f",
    borderTopWidth: 0.5,
    borderTopColor: "#1f2a23",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 8,
  },
  tabItem: {
    alignItems: "center",
    gap: 3,
  },
  tabLabel: {
    color: "#8e8e93",
    fontSize: 10,
    fontWeight: "600",
  },
  tabLabelOn: {
    color: "#00a862",
  },
});
