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

const LEFT_COLUMN = [
  {
    title: "Cozy loft ideas",
    height: 240,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
  },
  {
    title: "Ramen at home",
    height: 180,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
  },
  {
    title: "Forest cabin mood",
    height: 260,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
  },
];

const RIGHT_COLUMN = [
  {
    title: "Street style fits",
    height: 290,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80",
  },
  {
    title: "Latte art 101",
    height: 190,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
  },
  {
    title: "City rooftops",
    height: 220,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
  },
];

function Column({ pins }: { pins: typeof LEFT_COLUMN }) {
  return (
    <View style={styles.column}>
      {pins.map((pin) => (
        <View key={pin.title} style={styles.pin}>
          <Image
            source={{ uri: pin.image }}
            style={[styles.pinImage, { height: pin.height }]}
          />
          <View style={styles.pinFooter}>
            <Text style={styles.pinTitle} numberOfLines={1}>
              {pin.title}
            </Text>
            <Ionicons name="ellipsis-horizontal" size={16} color="#9ca3af" />
          </View>
        </View>
      ))}
    </View>
  );
}

export default function Pinterest() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.tabOn}>For you</Text>
        <Text style={styles.tab}>Following</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feed}
      >
        <View style={styles.masonry}>
          <Column pins={LEFT_COLUMN} />
          <Column pins={RIGHT_COLUMN} />
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <Ionicons name="home" size={25} color="#fff" />
        <Ionicons name="search" size={25} color="#8e8e93" />
        <Ionicons name="add" size={29} color="#8e8e93" />
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#8e8e93" />
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80",
          }}
          style={styles.profilePic}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#111",
  },
  header: {
    marginTop: 58,
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    paddingBottom: 12,
  },
  tabOn: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
    paddingBottom: 6,
  },
  tab: {
    color: "#8e8e93",
    fontSize: 16,
    fontWeight: "600",
  },
  feed: {
    paddingHorizontal: 10,
    paddingBottom: 90,
  },
  masonry: {
    flexDirection: "row",
    gap: 10,
  },
  column: {
    flex: 1,
    gap: 14,
  },
  pin: {
    gap: 6,
  },
  pinImage: {
    width: "100%",
    borderRadius: 18,
  },
  pinFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  pinTitle: {
    color: "#e5e7eb",
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#111",
    borderTopWidth: 0.5,
    borderTopColor: "#2c2c2e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 8,
  },
  profilePic: {
    width: 27,
    height: 27,
    borderRadius: 14,
  },
});
