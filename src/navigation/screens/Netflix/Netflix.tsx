import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const HERO = {
  title: "Stranger Worlds",
  tags: ["Sci-Fi", "Mystery", "Thriller"],
  image:
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&q=80",
};

const TRENDING = [
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80",
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&q=80",
];

const NEW_RELEASES = [
  "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=400&q=80",
  "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&q=80",
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80",
  "https://images.unsplash.com/photo-1626814026244-1e7a2f6e30e2?w=400&q=80",
  "https://images.unsplash.com/photo-1547700055-b61cacebece9?w=400&q=80",
];

const TOP_10 = [
  "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&q=80",
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80",
  "https://images.unsplash.com/photo-1518930259200-3e5f9f2c2f1f?w=400&q=80",
  "https://images.unsplash.com/photo-1604975999044-188783d54fb3?w=400&q=80",
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80",
];

function PosterRow({ title, posters }: { title: string; posters: string[] }) {
  const { width } = useWindowDimensions();
  return (
    <View style={{ marginTop: 22 }}>
      <Text style={styles.rowTitle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 14, gap: 8 }}
      >
        {posters.map((uri, i) => (
          <Image
            key={i}
            source={{ uri }}
            style={[
              styles.poster,
              {
                width: (width - 32 - 24) / 3.2,
                height: ((width - 32 - 24) / 3.2) * 1.45,
              },
            ]}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function Top10Row({ posters }: { posters: string[] }) {
  return (
    <View style={{ marginTop: 22 }}>
      <View style={styles.top10Header}>
        <View style={styles.top10Badge}>
          <Text style={styles.top10BadgeTop}>TOP</Text>
          <Text style={styles.top10BadgeNum}>10</Text>
        </View>
        <Text style={styles.rowTitleInline}>in Your Country Today</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 14, gap: 4, paddingTop: 6 }}
      >
        {posters.map((uri, i) => (
          <View key={i} style={styles.top10Item}>
            <Text style={styles.top10Number}>{i + 1}</Text>
            <Image source={{ uri }} style={styles.top10Poster} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default function Netflix() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: HERO.image }}
          style={styles.hero}
          imageStyle={{ opacity: 0.85 }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0)", "rgba(0,0,0,0.95)"]}
            locations={[0, 0.4, 1]}
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.topBar}>
            <Text style={styles.logo}>N</Text>
            <View style={styles.topActions}>
              <TouchableOpacity style={styles.topIcon}>
                <Ionicons name="tv-outline" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.topIcon}>
                <Ionicons name="search" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
                  }}
                  style={styles.profilePic}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.tabs}>
            <TouchableOpacity style={styles.tabPill}>
              <Text style={styles.tabPillTxt}>TV Shows</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabPill}>
              <Text style={styles.tabPillTxt}>Movies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabPillRow}>
              <Text style={styles.tabPillTxt}>Categories</Text>
              <Ionicons name="chevron-down" size={14} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.heroBottom}>
            <Text style={styles.heroTitle}>{HERO.title}</Text>
            <View style={styles.tagRow}>
              {HERO.tags.map((t, i) => (
                <React.Fragment key={t}>
                  {i > 0 && <View style={styles.tagDot} />}
                  <Text style={styles.tagTxt}>{t}</Text>
                </React.Fragment>
              ))}
            </View>
            <View style={styles.heroBtns}>
              <TouchableOpacity style={styles.playBtn}>
                <Ionicons name="play" size={20} color="#000" />
                <Text style={styles.playTxt}>Play</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.listBtn}>
                <Ionicons name="add" size={22} color="#fff" />
                <Text style={styles.listTxt}>My List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        <PosterRow title="Trending Now" posters={TRENDING} />
        <Top10Row posters={TOP_10} />
        <PosterRow title="New Releases" posters={NEW_RELEASES} />
        <PosterRow title="Continue Watching" posters={TRENDING.slice().reverse()} />

        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <BottomTab icon="home" label="Home" active />
        <BottomTab icon="search" label="New & Hot" />
        <BottomTab icon="play-box" label="Games" lib="mci" />
        <BottomTab icon="download" label="Downloads" />
        <BottomTab icon="menu" label="My Netflix" />
      </View>
    </View>
  );
}

function BottomTab({
  icon,
  label,
  active,
  lib = "ion",
}: {
  icon: string;
  label: string;
  active?: boolean;
  lib?: "ion" | "mci";
}) {
  const color = active ? "#fff" : "#9a9a9a";
  return (
    <TouchableOpacity style={styles.btmTab}>
      {lib === "mci" ? (
        <MaterialCommunityIcons name={icon as any} size={22} color={color} />
      ) : (
        <Ionicons name={icon as any} size={22} color={color} />
      )}
      <Text style={[styles.btmTxt, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  hero: { width: "100%", height: 620, justifyContent: "space-between" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  logo: {
    color: "#E50914",
    fontSize: 32,
    fontWeight: "900",
    fontStyle: "italic",
  },
  topActions: { flexDirection: "row", alignItems: "center", gap: 18 },
  topIcon: { padding: 2 },
  profilePic: { width: 28, height: 28, borderRadius: 4 },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 14,
    marginTop: 14,
    gap: 8,
  },
  tabPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  tabPillRow: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
    backgroundColor: "rgba(0,0,0,0.35)",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tabPillTxt: { color: "#fff", fontWeight: "600", fontSize: 13 },
  heroBottom: { paddingHorizontal: 16, paddingBottom: 12 },
  heroTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 1,
  },
  tagRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  tagDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E50914",
  },
  tagTxt: { color: "#dcdcdc", fontSize: 13, fontWeight: "600" },
  heroBtns: {
    flexDirection: "row",
    marginTop: 14,
    gap: 8,
  },
  playBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 4,
    gap: 6,
  },
  playTxt: { color: "#000", fontWeight: "700", fontSize: 15 },
  listBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(109,109,110,0.7)",
    paddingVertical: 10,
    borderRadius: 4,
    gap: 6,
  },
  listTxt: { color: "#fff", fontWeight: "700", fontSize: 15 },
  rowTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  rowTitleInline: { color: "#fff", fontSize: 17, fontWeight: "800" },
  poster: {
    borderRadius: 4,
    backgroundColor: "#222",
  },
  top10Header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
  },
  top10Badge: {
    backgroundColor: "#E50914",
    width: 24,
    height: 24,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  top10BadgeTop: { color: "#fff", fontSize: 7, fontWeight: "900" },
  top10BadgeNum: { color: "#fff", fontSize: 10, fontWeight: "900", marginTop: -1 },
  top10Item: { flexDirection: "row", alignItems: "flex-end" },
  top10Number: {
    color: "#000",
    fontSize: 110,
    fontWeight: "900",
    lineHeight: 110,
    textShadowColor: "#444",
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 0,
    marginRight: -16,
    fontFamily: undefined,
  },
  top10Poster: {
    width: 100,
    height: 150,
    borderRadius: 4,
    backgroundColor: "#222",
  },
  bottomBar: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.95)",
    borderTopWidth: 0.5,
    borderTopColor: "#222",
    paddingTop: 8,
    paddingBottom: 22,
  },
  btmTab: { flex: 1, alignItems: "center", gap: 4 },
  btmTxt: { fontSize: 10, fontWeight: "600" },
});
