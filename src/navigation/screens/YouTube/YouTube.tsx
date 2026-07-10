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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const VIDEO = {
  thumb:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
  title:
    "Building a React Native app from scratch in 2026 — full beginner course",
  channel: "CodeCraft",
  channelAvatar:
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
  subscribers: "1.42M",
  views: "847K",
  posted: "3 days ago",
  likes: "42K",
};

type Action = {
  icon: string;
  label: string;
  lib?: "ion" | "mci" | "mat";
  active?: boolean;
};

const ACTIONS: Action[] = [
  { icon: "thumbs-up-outline", label: VIDEO.likes },
  { icon: "thumbs-down-outline", label: "Dislike" },
  { icon: "share-social-outline", label: "Share" },
  { icon: "auto-fix", label: "Remix", lib: "mci" },
  { icon: "download-outline", label: "Download" },
  { icon: "bookmark-outline", label: "Save" },
];

type Suggested = {
  thumb: string;
  duration: string;
  title: string;
  channel: string;
  views: string;
  posted: string;
  verified?: boolean;
};

const SUGGESTED: Suggested[] = [
  {
    thumb:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    duration: "12:48",
    title: "I built a SaaS in a weekend with React Native — here's what broke",
    channel: "Theo - t3.gg",
    views: "318K views",
    posted: "1 week ago",
    verified: true,
  },
  {
    thumb:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=600&q=80",
    duration: "8:21",
    title: "Animations in React Native that actually feel native",
    channel: "William Candillon",
    views: "112K views",
    posted: "2 days ago",
    verified: true,
  },
  {
    thumb:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80",
    duration: "21:09",
    title: "Expo Router vs React Navigation — which one in 2026?",
    channel: "Beto Moedano",
    views: "94K views",
    posted: "5 days ago",
  },
  {
    thumb:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    duration: "5:42",
    title: "The Tailwind config I use on every Expo project",
    channel: "DevTips",
    views: "47K views",
    posted: "Yesterday",
  },
];

function ActionPill({ a }: { a: Action }) {
  return (
    <TouchableOpacity style={styles.actionPill}>
      {a.lib === "mci" ? (
        <MaterialCommunityIcons name={a.icon as any} size={20} color="#fff" />
      ) : (
        <Ionicons name={a.icon as any} size={20} color="#fff" />
      )}
      <Text style={styles.actionTxt}>{a.label}</Text>
    </TouchableOpacity>
  );
}

function SuggestedCard({ v }: { v: Suggested }) {
  return (
    <View style={styles.suggestedCard}>
      <View style={styles.thumbWrap}>
        <Image source={{ uri: v.thumb }} style={styles.suggestedThumb} />
        <View style={styles.duration}>
          <Text style={styles.durationTxt}>{v.duration}</Text>
        </View>
      </View>
      <View style={styles.suggestedBody}>
        <Text style={styles.suggestedTitle} numberOfLines={2}>
          {v.title}
        </Text>
        <View style={styles.suggestedMetaRow}>
          <Text style={styles.suggestedMeta}>{v.channel}</Text>
          {v.verified && (
            <MaterialIcons name="verified" size={12} color="#aaa" />
          )}
          <Text style={styles.suggestedMeta}>·</Text>
          <Text style={styles.suggestedMeta}>{v.views}</Text>
          <Text style={styles.suggestedMeta}>·</Text>
          <Text style={styles.suggestedMeta}>{v.posted}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.dotsBtn}>
        <Ionicons name="ellipsis-vertical" size={16} color="#aaa" />
      </TouchableOpacity>
    </View>
  );
}

export default function YouTube() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Player */}
      <ImageBackground source={{ uri: VIDEO.thumb }} style={styles.player}>
        <LinearGradient
          colors={["rgba(0,0,0,0.55)", "rgba(0,0,0,0)", "rgba(0,0,0,0.55)"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.playerTop}>
          <TouchableOpacity>
            <Ionicons name="chevron-down" size={26} color="#fff" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 18 }}>
            <MaterialCommunityIcons name="cast" size={22} color="#fff" />
            <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
          </View>
        </View>
        <View style={styles.playCenter}>
          <TouchableOpacity style={styles.playBigBtn}>
            <Ionicons name="play" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.playerBottom}>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
            <View style={styles.progressDot} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeTxt}>4:12</Text>
            <Ionicons name="scan-outline" size={18} color="#fff" />
          </View>
        </View>
      </ImageBackground>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Title block */}
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{VIDEO.title}</Text>
          <View style={styles.statRow}>
            <Text style={styles.stat}>{VIDEO.views} views</Text>
            <Text style={styles.stat}>· {VIDEO.posted}</Text>
            <Text style={styles.statMore}>...more</Text>
          </View>
        </View>

        {/* Channel row */}
        <View style={styles.channelRow}>
          <Image source={{ uri: VIDEO.channelAvatar }} style={styles.chAvatar} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Text style={styles.chName}>{VIDEO.channel}</Text>
              <MaterialIcons name="verified" size={14} color="#aaa" />
            </View>
            <Text style={styles.chSubs}>{VIDEO.subscribers} subscribers</Text>
          </View>
          <TouchableOpacity style={styles.subscribeBtn}>
            <Text style={styles.subscribeTxt}>Subscribe</Text>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.actions}
        >
          {ACTIONS.map((a) => (
            <ActionPill key={a.label} a={a} />
          ))}
        </ScrollView>

        {/* Comments preview */}
        <View style={styles.commentBox}>
          <View style={styles.commentHeader}>
            <Text style={styles.commentTitle}>Comments</Text>
            <Text style={styles.commentCount}>2,184</Text>
          </View>
          <View style={styles.commentRow}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&q=80",
              }}
              style={styles.commentAvatar}
            />
            <Text style={styles.commentTxt}>
              "first time everything compiled on the first try. legendary"
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Suggested */}
        <View style={{ paddingHorizontal: 12, paddingTop: 6 }}>
          {SUGGESTED.map((v, i) => (
            <SuggestedCard key={i} v={v} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.bottomBar}>
        <BottomTab icon="home" label="Home" active />
        <BottomTab icon="compass" label="Shorts" lib="mci" />
        <View style={styles.btmTab}>
          <View style={styles.plusCircle}>
            <Ionicons name="add" size={26} color="#fff" />
          </View>
        </View>
        <BottomTab icon="play-box-multiple" label="Subs" lib="mci" />
        <BottomTab icon="account-circle" label="You" lib="mci" />
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
  const color = active ? "#fff" : "#aaa";
  return (
    <TouchableOpacity style={styles.btmTab}>
      {lib === "mci" ? (
        <MaterialCommunityIcons name={icon as any} size={24} color={color} />
      ) : (
        <Ionicons name={icon as any} size={24} color={color} />
      )}
      <Text style={[styles.btmTxt, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0f0f0f", paddingTop: 0 },
  player: {
    width: "100%",
    height: 240,
    backgroundColor: "#000",
    justifyContent: "space-between",
    paddingTop: 50,
  },
  playerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  playCenter: { alignItems: "center", justifyContent: "center" },
  playBigBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  playerBottom: { paddingHorizontal: 14, paddingBottom: 8 },
  progressTrack: {
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    overflow: "visible",
    flexDirection: "row",
    alignItems: "center",
  },
  progressFill: {
    width: "32%",
    height: 3,
    backgroundColor: "#FF0000",
    borderRadius: 2,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF0000",
    marginLeft: -6,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  timeTxt: { color: "#fff", fontSize: 12, fontWeight: "600" },
  titleBlock: { paddingHorizontal: 14, paddingTop: 12 },
  title: { color: "#fff", fontSize: 16, fontWeight: "700", lineHeight: 22 },
  statRow: { flexDirection: "row", marginTop: 6, gap: 4 },
  stat: { color: "#aaa", fontSize: 12 },
  statMore: { color: "#fff", fontSize: 12, fontWeight: "700", marginLeft: 4 },
  channelRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  chAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#222" },
  chName: { color: "#fff", fontSize: 14, fontWeight: "700" },
  chSubs: { color: "#aaa", fontSize: 12, marginTop: 1 },
  subscribeBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  subscribeTxt: { color: "#000", fontWeight: "700", fontSize: 14 },
  actions: { paddingHorizontal: 12, gap: 8, paddingBottom: 12 },
  actionPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272727",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  actionTxt: { color: "#fff", fontSize: 13, fontWeight: "600" },
  commentBox: {
    marginHorizontal: 12,
    backgroundColor: "#212121",
    borderRadius: 12,
    padding: 12,
  },
  commentHeader: { flexDirection: "row", alignItems: "baseline", gap: 8 },
  commentTitle: { color: "#fff", fontSize: 14, fontWeight: "700" },
  commentCount: { color: "#aaa", fontSize: 12 },
  commentRow: { flexDirection: "row", marginTop: 8, gap: 10, alignItems: "center" },
  commentAvatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#333" },
  commentTxt: { color: "#fff", fontSize: 13, flex: 1 },
  divider: { height: 8, backgroundColor: "#000", marginTop: 12 },
  suggestedCard: {
    flexDirection: "row",
    paddingVertical: 8,
    gap: 8,
  },
  thumbWrap: { position: "relative" },
  suggestedThumb: {
    width: 160,
    height: 90,
    borderRadius: 6,
    backgroundColor: "#222",
  },
  duration: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.85)",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  durationTxt: { color: "#fff", fontSize: 10, fontWeight: "700" },
  suggestedBody: { flex: 1, paddingTop: 2, paddingRight: 4 },
  suggestedTitle: { color: "#fff", fontSize: 13, fontWeight: "600", lineHeight: 18 },
  suggestedMetaRow: { flexDirection: "row", marginTop: 4, alignItems: "center", gap: 4, flexWrap: "wrap" },
  suggestedMeta: { color: "#aaa", fontSize: 11 },
  dotsBtn: { padding: 4 },
  bottomBar: {
    flexDirection: "row",
    backgroundColor: "#0f0f0f",
    borderTopWidth: 0.5,
    borderTopColor: "#222",
    paddingTop: 6,
    paddingBottom: 22,
  },
  btmTab: { flex: 1, alignItems: "center", gap: 2 },
  btmTxt: { fontSize: 10, fontWeight: "500" },
  plusCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#272727",
    alignItems: "center",
    justifyContent: "center",
  },
});
