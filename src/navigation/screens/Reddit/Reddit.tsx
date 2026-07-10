import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type Post = {
  id: string;
  sub: string;
  subIcon: string;
  author: string;
  posted: string;
  title: string;
  flair?: { label: string; color: string };
  body?: string;
  image?: string;
  votes: string;
  comments: string;
};

const POSTS: Post[] = [
  {
    id: "1",
    sub: "r/EarthPorn",
    subIcon:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80",
    author: "u/wanderlight",
    posted: "4h",
    title: "Caught the Milky Way over Banff before the storm rolled in [OC]",
    flair: { label: "OC", color: "#ff4500" },
    image:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80",
    votes: "24.1k",
    comments: "812",
  },
  {
    id: "2",
    sub: "r/programming",
    subIcon:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80",
    author: "u/halt_and_catch_fire",
    posted: "7h",
    title:
      "After 10 years of writing TypeScript, here's the one rule I wish I'd learned sooner",
    body: "Stop using `any`. I know, I know — you've heard it. But every single bug I've shipped to prod in the last...",
    votes: "3.4k",
    comments: "428",
  },
  {
    id: "3",
    sub: "r/Damnthatsinteresting",
    subIcon:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=200&q=80",
    author: "u/curious_george",
    posted: "12h",
    title:
      "This abandoned hotel in the Alps was reclaimed by snow in just 3 winters",
    image:
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200&q=80",
    votes: "58.7k",
    comments: "1.2k",
  },
  {
    id: "4",
    sub: "r/AskReddit",
    subIcon:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=200&q=80",
    author: "u/tea_and_questions",
    posted: "2h",
    title:
      "What's a small thing your partner does that makes you feel deeply loved?",
    votes: "12.4k",
    comments: "3.1k",
  },
];

function PostCard({ p }: { p: Post }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: p.subIcon }} style={styles.subIcon} />
        <View style={{ flex: 1, marginLeft: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Text style={styles.subName}>{p.sub}</Text>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.posted}>{p.posted}</Text>
          </View>
          <Text style={styles.author}>{p.author}</Text>
        </View>
        <TouchableOpacity style={styles.joinBtn}>
          <Ionicons name="add" size={14} color="#fff" />
          <Text style={styles.joinTxt}>Join</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 8 }}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleRow}>
        {p.flair && (
          <View style={[styles.flair, { backgroundColor: p.flair.color }]}>
            <Text style={styles.flairTxt}>{p.flair.label}</Text>
          </View>
        )}
        <Text style={styles.title}>{p.title}</Text>
      </View>

      {p.body && (
        <Text style={styles.body} numberOfLines={3}>
          {p.body}
        </Text>
      )}

      {p.image && <Image source={{ uri: p.image }} style={styles.postImage} />}

      <View style={styles.actionRow}>
        <View style={styles.voteCluster}>
          <TouchableOpacity>
            <Ionicons name="arrow-up" size={18} color="#D7DADC" />
          </TouchableOpacity>
          <Text style={styles.voteCount}>{p.votes}</Text>
          <TouchableOpacity>
            <Ionicons name="arrow-down" size={18} color="#D7DADC" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.actionPill}>
          <Ionicons name="chatbubble-outline" size={16} color="#D7DADC" />
          <Text style={styles.actionTxt}>{p.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionPill}>
          <FontAwesome5 name="award" size={15} color="#D7DADC" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionPill}>
          <Ionicons name="share-outline" size={16} color="#D7DADC" />
          <Text style={styles.actionTxt}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Reddit() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.topBar}>
        <View style={styles.dropdown}>
          <View style={styles.snooBadge}>
            <FontAwesome5 name="reddit-alien" size={20} color="#fff" />
          </View>
          <Text style={styles.feedName}>Home</Text>
          <Ionicons name="chevron-down" size={16} color="#fff" />
        </View>
        <View style={styles.topRight}>
          <Ionicons name="search" size={22} color="#D7DADC" />
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80",
            }}
            style={styles.profilePic}
          />
        </View>
      </View>

      <View style={styles.sortBar}>
        <Ionicons name="rocket" size={16} color="#D7DADC" />
        <Text style={styles.sortLabel}>Best</Text>
        <Ionicons name="chevron-down" size={14} color="#D7DADC" />
        <View style={{ flex: 1 }} />
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-grid" size={20} color="#D7DADC" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {POSTS.map((p) => (
          <PostCard key={p.id} p={p} />
        ))}
        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <BottomTab icon="home" label="Home" active />
        <BottomTab icon="trending-up" label="Popular" />
        <View style={styles.btmTab}>
          <TouchableOpacity style={styles.createBtn}>
            <Ionicons name="add" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <BottomTab icon="chatbubble-ellipses-outline" label="Chat" />
        <BottomTab icon="notifications-outline" label="Inbox" />
      </View>
    </View>
  );
}

function BottomTab({
  icon,
  label,
  active,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  const color = active ? "#fff" : "#818384";
  return (
    <TouchableOpacity style={styles.btmTab}>
      <Ionicons name={icon as any} size={22} color={color} />
      <Text style={[styles.btmTxt, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#030303" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingTop: 56,
    paddingBottom: 10,
    backgroundColor: "#1a1a1b",
  },
  dropdown: { flexDirection: "row", alignItems: "center", gap: 8 },
  snooBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FF4500",
    alignItems: "center",
    justifyContent: "center",
  },
  feedName: { color: "#fff", fontSize: 18, fontWeight: "700" },
  topRight: { flexDirection: "row", alignItems: "center", gap: 14 },
  profilePic: { width: 30, height: 30, borderRadius: 15 },
  sortBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1b",
    paddingHorizontal: 14,
    paddingBottom: 10,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#272729",
  },
  sortLabel: { color: "#D7DADC", fontSize: 14, fontWeight: "700" },
  card: {
    backgroundColor: "#1a1a1b",
    marginTop: 8,
    paddingTop: 12,
    paddingBottom: 6,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  subIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#222" },
  subName: { color: "#fff", fontSize: 13, fontWeight: "700" },
  dot: { color: "#818384", fontSize: 12 },
  posted: { color: "#818384", fontSize: 12 },
  author: { color: "#818384", fontSize: 11, marginTop: 1 },
  joinBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF4500",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 2,
  },
  joinTxt: { color: "#fff", fontWeight: "700", fontSize: 13 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 6,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  flair: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  flairTxt: { color: "#fff", fontSize: 10, fontWeight: "800" },
  title: { color: "#D7DADC", fontSize: 16, fontWeight: "700", flex: 1, lineHeight: 22 },
  body: {
    color: "#818384",
    fontSize: 13,
    paddingHorizontal: 12,
    marginBottom: 10,
    lineHeight: 18,
  },
  postImage: {
    width: "100%",
    aspectRatio: 16 / 10,
    backgroundColor: "#222",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 10,
    gap: 8,
  },
  voteCluster: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272729",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 8,
  },
  voteCount: { color: "#D7DADC", fontSize: 13, fontWeight: "700" },
  actionPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272729",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  actionTxt: { color: "#D7DADC", fontSize: 13, fontWeight: "600" },
  bottomBar: {
    flexDirection: "row",
    backgroundColor: "#1a1a1b",
    borderTopWidth: 0.5,
    borderTopColor: "#272729",
    paddingTop: 6,
    paddingBottom: 22,
  },
  btmTab: { flex: 1, alignItems: "center", gap: 2 },
  btmTxt: { fontSize: 10, fontWeight: "600" },
  createBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FF4500",
    alignItems: "center",
    justifyContent: "center",
  },
});
