import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const CATEGORIES = [
  { icon: "fire", label: "Trending", active: true },
  { icon: "waves", label: "Beachfront", active: false },
  { icon: "pine-tree", label: "Cabins", active: false },
  { icon: "city-variant-outline", label: "Cities", active: false },
  { icon: "tent", label: "Camping", active: false },
  { icon: "snowflake", label: "Arctic", active: false },
] as const;

const LISTINGS = [
  {
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80",
    title: "Malibu, California",
    rating: "4.97",
    subtitle: "Beach and ocean views",
    dates: "Aug 12 – 17",
    price: "$412",
    favourite: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
    title: "Joshua Tree, California",
    rating: "4.89",
    subtitle: "Desert retreat with pool",
    dates: "Sep 2 – 7",
    price: "$268",
    favourite: false,
  },
  {
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80",
    title: "Tulum, Mexico",
    rating: "4.92",
    subtitle: "Jungle loft near the beach",
    dates: "Oct 9 – 14",
    price: "$189",
    favourite: false,
  },
];

export default function Airbnb() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.searchPill}>
          <Ionicons name="search" size={20} color="#fff" />
          <View>
            <Text style={styles.searchTitle}>Where to?</Text>
            <Text style={styles.searchSub}>
              Anywhere · Any week · Add guests
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <MaterialCommunityIcons name="tune" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.label} style={styles.category}>
              <MaterialCommunityIcons
                name={cat.icon}
                size={24}
                color={cat.active ? "#fff" : "#8e8e93"}
              />
              <Text
                style={[styles.categoryLabel, cat.active && styles.categoryOn]}
              >
                {cat.label}
              </Text>
              {cat.active && <View style={styles.categoryLine} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feed}
      >
        {LISTINGS.map((item) => (
          <View key={item.title} style={styles.card}>
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.cardImage}
              imageStyle={styles.cardImageRadius}
            >
              {item.favourite && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Guest favourite</Text>
                </View>
              )}
              <TouchableOpacity style={styles.heart}>
                <Ionicons
                  name="heart"
                  size={26}
                  color="rgba(0,0,0,0.45)"
                  style={styles.heartFill}
                />
                <Ionicons name="heart-outline" size={26} color="#fff" />
              </TouchableOpacity>
              <View style={styles.dots}>
                {[0, 1, 2, 3, 4].map((dot) => (
                  <View
                    key={dot}
                    style={[styles.dot, dot === 0 && styles.dotOn]}
                  />
                ))}
              </View>
            </ImageBackground>

            <View style={styles.cardInfo}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.rating}>
                  <Ionicons name="star" size={13} color="#fff" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
              <Text style={styles.cardSub}>{item.subtitle}</Text>
              <Text style={styles.cardSub}>{item.dates}</Text>
              <Text style={styles.cardPrice}>
                {item.price}
                <Text style={styles.cardPriceUnit}> night</Text>
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.mapPill}>
        <Text style={styles.mapPillText}>Map</Text>
        <MaterialCommunityIcons name="map-outline" size={18} color="#fff" />
      </TouchableOpacity>

      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Ionicons name="search" size={24} color="#ff385c" />
          <Text style={[styles.tabLabel, styles.tabLabelOn]}>Explore</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="heart-outline" size={24} color="#8e8e93" />
          <Text style={styles.tabLabel}>Wishlists</Text>
        </View>
        <View style={styles.tabItem}>
          <MaterialCommunityIcons
            name="home-city-outline"
            size={24}
            color="#8e8e93"
          />
          <Text style={styles.tabLabel}>Trips</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#8e8e93" />
          <Text style={styles.tabLabel}>Messages</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="person-circle-outline" size={24} color="#8e8e93" />
          <Text style={styles.tabLabel}>Profile</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0b0b0b",
    paddingTop: 56,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
  },
  searchPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#1c1c1e",
    borderRadius: 32,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#2c2c2e",
  },
  searchTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  searchSub: {
    color: "#8e8e93",
    fontSize: 12,
    marginTop: 1,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3a3a3c",
    alignItems: "center",
    justifyContent: "center",
  },
  categories: {
    paddingHorizontal: 20,
    gap: 28,
    paddingTop: 20,
    paddingBottom: 10,
  },
  category: {
    alignItems: "center",
    gap: 6,
  },
  categoryLabel: {
    color: "#8e8e93",
    fontSize: 12,
    fontWeight: "600",
  },
  categoryOn: {
    color: "#fff",
  },
  categoryLine: {
    width: "100%",
    height: 2,
    borderRadius: 1,
    backgroundColor: "#fff",
  },
  feed: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  card: {
    marginTop: 18,
  },
  cardImage: {
    height: 300,
  },
  cardImageRadius: {
    borderRadius: 18,
  },
  badge: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  badgeText: {
    color: "#111",
    fontSize: 12,
    fontWeight: "700",
  },
  heart: {
    position: "absolute",
    top: 14,
    right: 14,
  },
  heartFill: {
    position: "absolute",
  },
  dots: {
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
    flexDirection: "row",
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dotOn: {
    backgroundColor: "#fff",
  },
  cardInfo: {
    marginTop: 10,
    gap: 2,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    color: "#fff",
    fontSize: 14,
  },
  cardSub: {
    color: "#8e8e93",
    fontSize: 14,
  },
  cardPrice: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 4,
  },
  cardPriceUnit: {
    fontWeight: "400",
  },
  mapPill: {
    position: "absolute",
    bottom: 84,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1c1c1e",
    borderWidth: 1,
    borderColor: "#3a3a3c",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  mapPillText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
    backgroundColor: "#0b0b0b",
    borderTopWidth: 0.5,
    borderTopColor: "#2c2c2e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
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
    color: "#ff385c",
  },
});
