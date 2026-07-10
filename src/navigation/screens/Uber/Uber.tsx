import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type Ride = {
  id: string;
  name: string;
  desc: string;
  capacity: number;
  arriveIn: string;
  price: string;
  oldPrice?: string;
  iconLib: "fa5" | "mci";
  icon: string;
  badge?: string;
  popular?: boolean;
};

const RIDES: Ride[] = [
  {
    id: "1",
    name: "UberX",
    desc: "Affordable rides all to yourself",
    capacity: 4,
    arriveIn: "3 min",
    price: "$14.92",
    iconLib: "fa5",
    icon: "car-side",
    popular: true,
  },
  {
    id: "2",
    name: "Comfort",
    desc: "Newer cars with extra legroom",
    capacity: 4,
    arriveIn: "5 min",
    price: "$18.40",
    iconLib: "fa5",
    icon: "car",
  },
  {
    id: "3",
    name: "UberXL",
    desc: "Affordable rides for groups up to 6",
    capacity: 6,
    arriveIn: "6 min",
    price: "$22.18",
    iconLib: "mci",
    icon: "car-estate",
  },
  {
    id: "4",
    name: "Black",
    desc: "Premium rides in luxury cars",
    capacity: 4,
    arriveIn: "8 min",
    price: "$34.50",
    oldPrice: "$38.00",
    iconLib: "fa5",
    icon: "car-side",
    badge: "PROMO",
  },
];

export default function Uber() {
  const [selected, setSelected] = useState("1");
  const selectedRide = RIDES.find((r) => r.id === selected)!;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Map */}
      <ImageBackground
        source={{
          uri: "https://camo.githubusercontent.com/25e699a6c9ef0296bae222d6e846697a55d912d9f29c569e297bde23044f6827/68747470733a2f2f322e62702e626c6f6773706f742e636f6d2f2d574f70483738393364526b2f5733527372626f476678492f41414141414141414356552f767a6b39683975526262415777485633366a5455644b4f555552795946322d6167434c63424741732f73313630302f73637265656e73686f74362e706e67",
        }}
        style={styles.map}
        imageStyle={{ opacity: 0.7 }}
      >
        <View style={styles.mapTint} />

        {/* Top controls */}
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.roundBtn}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.roundBtn, styles.locateBtn]}>
          <MaterialCommunityIcons name="crosshairs-gps" size={22} color="#000" />
        </TouchableOpacity>

        {/* Pickup pin */}
        <View style={styles.pickupPin}>
          <View style={styles.pickupOuter}>
            <View style={styles.pickupInner} />
          </View>
        </View>

        {/* Drop pin */}
        <View style={styles.dropPin}>
          <View style={styles.dropMarker}>
            <Ionicons name="square" size={10} color="#fff" />
          </View>
        </View>

        {/* Route line (visual) */}
        <View style={styles.routeLine} />
      </ImageBackground>

      {/* Bottom sheet */}
      <View style={styles.sheet}>
        <View style={styles.handle} />

        <Text style={styles.sheetTitle}>Choose a ride</Text>

        <View style={styles.routeBlock}>
          <View style={styles.routeIcons}>
            <View style={styles.dotPickup} />
            <View style={styles.dotsLine} />
            <View style={styles.dotDrop} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.routeRow}>
              <Text style={styles.routeLabel}>From</Text>
              <Text style={styles.routeText}>Current location</Text>
            </View>
            <View style={[styles.routeRow, { marginTop: 14 }]}>
              <Text style={styles.routeLabel}>To</Text>
              <Text style={styles.routeText}>Brooklyn Roasting Co.</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.swapBtn}>
            <MaterialCommunityIcons name="swap-vertical" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ maxHeight: 280 }} showsVerticalScrollIndicator={false}>
          {RIDES.map((r) => {
            const isSel = r.id === selected;
            return (
              <TouchableOpacity
                key={r.id}
                onPress={() => setSelected(r.id)}
                style={[styles.rideRow, isSel && styles.rideRowActive]}
              >
                <View style={styles.rideIconWrap}>
                  {r.iconLib === "fa5" ? (
                    <FontAwesome5 name={r.icon as any} size={26} color="#fff" />
                  ) : (
                    <MaterialCommunityIcons name={r.icon as any} size={30} color="#fff" />
                  )}
                  <View style={styles.capacityBadge}>
                    <Ionicons name="person" size={9} color="#fff" />
                    <Text style={styles.capacityTxt}>{r.capacity}</Text>
                  </View>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Text style={styles.rideName}>{r.name}</Text>
                    {r.popular && (
                      <View style={styles.popularBadge}>
                        <Ionicons name="flash" size={9} color="#000" />
                        <Text style={styles.popularTxt}>Popular</Text>
                      </View>
                    )}
                    {r.badge && (
                      <View style={styles.promoBadge}>
                        <Text style={styles.promoTxt}>{r.badge}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.rideDesc} numberOfLines={1}>{r.desc}</Text>
                  <Text style={styles.rideEta}>{r.arriveIn} away</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.ridePrice}>{r.price}</Text>
                  {r.oldPrice && (
                    <Text style={styles.rideOldPrice}>{r.oldPrice}</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.payRow}>
          <TouchableOpacity style={styles.payBtn}>
            <FontAwesome5 name="cc-visa" size={16} color="#fff" />
            <Text style={styles.payTxt}>Visa  •  4242</Text>
            <Ionicons name="chevron-forward" size={14} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeBtn}>
            <MaterialCommunityIcons name="clock-outline" size={16} color="#fff" />
            <Text style={styles.payTxt}>Now</Text>
            <Ionicons name="chevron-forward" size={14} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.confirmBtn}>
          <Text style={styles.confirmTxt}>
            Choose {selectedRide.name}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  map: {
    height: 360,
    width: "100%",
    backgroundColor: "#1a1d23",
    justifyContent: "flex-start",
  },
  mapTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  topControls: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingTop: 56,
  },
  roundBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  locateBtn: {
    position: "absolute",
    right: 14,
    bottom: 14,
  },
  pickupPin: {
    position: "absolute",
    left: "30%",
    top: "55%",
  },
  pickupOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  pickupInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
  },
  dropPin: {
    position: "absolute",
    right: "22%",
    top: "30%",
  },
  dropMarker: {
    width: 22,
    height: 22,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#fff",
  },
  routeLine: {
    position: "absolute",
    left: "33%",
    top: "37%",
    width: 130,
    height: 3,
    backgroundColor: "#fff",
    transform: [{ rotate: "-30deg" }],
    opacity: 0.85,
  },
  sheet: {
    flex: 1,
    backgroundColor: "#0f0f10",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 24,
  },
  handle: {
    alignSelf: "center",
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#3f3f46",
    marginBottom: 12,
  },
  sheetTitle: { color: "#fff", fontSize: 22, fontWeight: "800", marginBottom: 12 },
  routeBlock: {
    flexDirection: "row",
    backgroundColor: "#1a1a1c",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  routeIcons: { alignItems: "center", marginRight: 12 },
  dotPickup: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#fff" },
  dotsLine: { width: 2, height: 28, backgroundColor: "#3f3f46", marginVertical: 2 },
  dotDrop: { width: 10, height: 10, backgroundColor: "#fff" },
  routeRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  routeLabel: { color: "#71767b", fontSize: 12, fontWeight: "600" },
  routeText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  swapBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#27272a",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  rideRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 4,
  },
  rideRowActive: {
    backgroundColor: "#1a1a1c",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  rideIconWrap: { width: 60, height: 50, alignItems: "center", justifyContent: "center", position: "relative" },
  capacityBadge: {
    position: "absolute",
    bottom: -2,
    right: 6,
    backgroundColor: "#27272a",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 8,
    gap: 1,
  },
  capacityTxt: { color: "#fff", fontSize: 10, fontWeight: "700" },
  rideName: { color: "#fff", fontSize: 16, fontWeight: "700" },
  popularBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  popularTxt: { color: "#000", fontSize: 9, fontWeight: "800" },
  promoBadge: {
    backgroundColor: "#10b981",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  promoTxt: { color: "#000", fontSize: 9, fontWeight: "800" },
  rideDesc: { color: "#9ca3af", fontSize: 12, marginTop: 2 },
  rideEta: { color: "#71767b", fontSize: 11, marginTop: 2 },
  ridePrice: { color: "#fff", fontSize: 16, fontWeight: "800" },
  rideOldPrice: {
    color: "#71767b",
    fontSize: 12,
    textDecorationLine: "line-through",
    marginTop: 2,
  },
  payRow: { flexDirection: "row", gap: 8, marginTop: 12 },
  payBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1c",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  timeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1c",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  payTxt: { color: "#fff", fontSize: 13, fontWeight: "600", flex: 1 },
  confirmBtn: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
  },
  confirmTxt: { color: "#000", fontSize: 16, fontWeight: "800" },
});
