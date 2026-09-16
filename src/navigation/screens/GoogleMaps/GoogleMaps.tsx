import React, { useEffect, useRef } from "react";
import {
  Animated,
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

const AVATAR =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80";
const PLACE =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80";

const CHIPS = [
  { icon: "silverware-fork-knife", label: "Restaurants" },
  { icon: "coffee", label: "Coffee" },
  { icon: "gas-station", label: "Gas" },
  { icon: "cart-outline", label: "Groceries" },
  { icon: "parking", label: "Parking" },
] as const;

export default function GoogleMaps() {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
      })
    ).start();
  }, [pulse]);

  const haloScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 2.2],
  });
  const haloOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.map}>
        <View style={[styles.water]} />
        <View style={[styles.park, { top: "12%", left: "62%" }]} />
        <View style={[styles.park, { top: "58%", left: "6%" }]} />

        <View style={[styles.road, styles.roadH, { top: "22%" }]} />
        <View style={[styles.road, styles.roadH, { top: "40%" }]} />
        <View style={[styles.road, styles.roadH, { top: "63%" }]} />
        <View style={[styles.road, styles.roadV, { left: "24%" }]} />
        <View style={[styles.road, styles.roadV, { left: "55%" }]} />
        <View style={[styles.road, styles.roadV, { left: "82%" }]} />
        <View style={styles.avenue} />

        <View style={[styles.route, styles.routeA]} />
        <View style={[styles.route, styles.routeB]} />
        <View style={[styles.route, styles.routeC]} />

        <View style={[styles.poi, { top: "26%", left: "38%" }]}>
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={11}
            color="#0f1116"
          />
        </View>
        <View style={[styles.poi, { top: "48%", left: "70%" }]}>
          <MaterialCommunityIcons name="coffee" size={11} color="#0f1116" />
        </View>

        <View style={styles.pin}>
          <Ionicons name="location-sharp" size={40} color="#ea4335" />
          <View style={styles.pinShadow} />
        </View>

        <View style={styles.me}>
          <Animated.View
            style={[
              styles.meHalo,
              { opacity: haloOpacity, transform: [{ scale: haloScale }] },
            ]}
          />
          <View style={styles.meDot} />
        </View>

        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapBtn}>
            <MaterialCommunityIcons
              name="layers-outline"
              size={20}
              color="#e8eaed"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapBtn}>
            <MaterialCommunityIcons
              name="compass-outline"
              size={20}
              color="#e8eaed"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapBtn}>
            <Ionicons name="locate" size={20} color="#8ab4f8" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9aa0a6" />
          <Text style={styles.searchText}>Search here</Text>
          <Ionicons name="mic-outline" size={20} color="#9aa0a6" />
          <Image source={{ uri: AVATAR }} style={styles.avatar} />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {CHIPS.map((chip) => (
            <TouchableOpacity key={chip.label} style={styles.chip}>
              <MaterialCommunityIcons
                name={chip.icon}
                size={15}
                color="#8ab4f8"
              />
              <Text style={styles.chipText}>{chip.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.sheetHeader}>
          <View style={styles.sheetTitleWrap}>
            <Text style={styles.sheetTitle}>Blue Bottle Coffee</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingValue}>4.8</Text>
              {[0, 1, 2, 3, 4].map((star) => (
                <Ionicons key={star} name="star" size={12} color="#fbbc04" />
              ))}
              <Text style={styles.ratingCount}>(486)</Text>
            </View>
            <Text style={styles.sheetSub}>
              Coffee shop · <Text style={styles.open}>Open</Text> · Closes 6 PM
            </Text>
            <Text style={styles.sheetSub}>12 min drive · 3.2 mi</Text>
          </View>
          <Image source={{ uri: PLACE }} style={styles.placeImage} />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.actions}
        >
          <TouchableOpacity style={styles.actionPrimary}>
            <MaterialCommunityIcons
              name="directions"
              size={18}
              color="#202124"
            />
            <Text style={styles.actionPrimaryText}>Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="navigate-outline" size={17} color="#8ab4f8" />
            <Text style={styles.actionText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="call-outline" size={17} color="#8ab4f8" />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="bookmark-outline" size={17} color="#8ab4f8" />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="share-social-outline" size={17} color="#8ab4f8" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#171c26",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  water: {
    position: "absolute",
    top: "72%",
    left: "58%",
    right: "-10%",
    bottom: "-5%",
    backgroundColor: "#10202e",
    borderTopLeftRadius: 120,
  },
  park: {
    position: "absolute",
    width: "26%",
    height: "14%",
    backgroundColor: "#152219",
    borderRadius: 18,
  },
  road: {
    position: "absolute",
    backgroundColor: "#252d3b",
  },
  roadH: {
    left: 0,
    right: 0,
    height: 4,
  },
  roadV: {
    top: 0,
    bottom: 0,
    width: 4,
  },
  avenue: {
    position: "absolute",
    top: "48%",
    left: "-20%",
    width: "150%",
    height: 7,
    backgroundColor: "#2b3446",
    transform: [{ rotate: "-24deg" }],
  },
  route: {
    position: "absolute",
    backgroundColor: "#4285f4",
    borderRadius: 3,
    shadowColor: "#4285f4",
    shadowOpacity: 0.9,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  routeA: {
    left: "24%",
    top: "40%",
    height: "23.5%",
    width: 5,
  },
  routeB: {
    left: "24%",
    top: "40%",
    width: "31%",
    height: 5,
  },
  routeC: {
    left: "55%",
    top: "19%",
    height: "21.5%",
    width: 5,
  },
  poi: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#c5854a",
    alignItems: "center",
    justifyContent: "center",
  },
  pin: {
    position: "absolute",
    top: "13%",
    left: "51%",
    alignItems: "center",
  },
  pinShadow: {
    width: 12,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginTop: -4,
  },
  me: {
    position: "absolute",
    top: "62%",
    left: "22.5%",
    alignItems: "center",
    justifyContent: "center",
  },
  meHalo: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#4285f4",
  },
  meDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#4285f4",
    borderWidth: 3,
    borderColor: "#fff",
  },
  mapControls: {
    position: "absolute",
    right: 14,
    top: "38%",
    gap: 10,
  },
  mapBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#202124",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2f3237",
  },
  header: {
    marginTop: 56,
    gap: 12,
  },
  searchBar: {
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#202124",
    borderRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#2f3237",
  },
  searchText: {
    flex: 1,
    color: "#9aa0a6",
    fontSize: 16,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  chips: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#202124",
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#2f3237",
  },
  chipText: {
    color: "#e8eaed",
    fontSize: 13,
    fontWeight: "600",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#202124",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingBottom: 34,
  },
  handle: {
    alignSelf: "center",
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#5f6368",
    marginTop: 10,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  sheetTitleWrap: {
    gap: 4,
    flex: 1,
  },
  sheetTitle: {
    color: "#e8eaed",
    fontSize: 21,
    fontWeight: "700",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingValue: {
    color: "#e8eaed",
    fontSize: 13,
    marginRight: 2,
  },
  ratingCount: {
    color: "#9aa0a6",
    fontSize: 13,
    marginLeft: 2,
  },
  sheetSub: {
    color: "#9aa0a6",
    fontSize: 13,
  },
  open: {
    color: "#81c995",
  },
  placeImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    marginLeft: 12,
  },
  actions: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 8,
  },
  actionPrimary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#8ab4f8",
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  actionPrimaryText: {
    color: "#202124",
    fontSize: 13,
    fontWeight: "700",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#5f6368",
  },
  actionText: {
    color: "#8ab4f8",
    fontSize: 13,
    fontWeight: "600",
  },
});
