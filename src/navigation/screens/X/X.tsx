import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";

type Tweet = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
  time: string;
  text: string;
  image?: string;
  replies: string;
  retweets: string;
  likes: string;
  views: string;
};

const TWEETS: Tweet[] = [
  {
    id: "1",
    name: "Pieter Levels",
    handle: "@levelsio",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    verified: true,
    time: "2h",
    text: "Built a new app this weekend. 6 hours from idea to first paying customer.\n\nReact Native + Expo + Stripe.\n\nThe magic of small bets compounds.",
    replies: "284",
    retweets: "1.2K",
    likes: "18.4K",
    views: "1.2M",
  },
  {
    id: "2",
    name: "NASA",
    handle: "@NASA",
    avatar:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=200&q=80",
    verified: true,
    time: "5h",
    text: "Webb captured this view of the Pillars of Creation in unprecedented detail. Stars are forming inside those columns of gas right now — it just takes light 7,000 years to reach us.",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=80",
    replies: "4.1K",
    retweets: "32.7K",
    likes: "412K",
    views: "8.4M",
  },
  {
    id: "3",
    name: "Sarah Drasner",
    handle: "@sarah_edo",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    verified: true,
    time: "8h",
    text: "Hot take: most animations in apps are 2x too long. Cut your durations in half and watch your UI feel instantly more responsive.",
    replies: "412",
    retweets: "1.8K",
    likes: "12.1K",
    views: "284K",
  },
  {
    id: "4",
    name: "lo-fi observer",
    handle: "@lofi_obs",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    time: "11h",
    text: "tokyo at 3am hits different",
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&q=80",
    replies: "82",
    retweets: "428",
    likes: "9.4K",
    views: "184K",
  },
];

function VerifiedBadge() {
  return (
    <View style={styles.verifiedBadge}>
      <MaterialIcons name="verified" size={14} color="#1d9bf0" />
    </View>
  );
}

function TweetCard({ t }: { t: Tweet }) {
  return (
    <View style={styles.tweet}>
      <Image source={{ uri: t.avatar }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <View style={styles.tweetHeader}>
          <Text style={styles.name}>{t.name}</Text>
          {t.verified && <VerifiedBadge />}
          <Text style={styles.handle}>{t.handle}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.handle}>{t.time}</Text>
          <View style={{ flex: 1 }} />
          <Ionicons name="ellipsis-horizontal" size={16} color="#71767b" />
        </View>
        <Text style={styles.text}>{t.text}</Text>

        {t.image && <Image source={{ uri: t.image }} style={styles.tweetImage} />}

        <View style={styles.actionRow}>
          <View style={styles.action}>
            <Ionicons name="chatbubble-outline" size={16} color="#71767b" />
            <Text style={styles.actionTxt}>{t.replies}</Text>
          </View>
          <View style={styles.action}>
            <FontAwesome6 name="retweet" size={15} color="#71767b" />
            <Text style={styles.actionTxt}>{t.retweets}</Text>
          </View>
          <View style={styles.action}>
            <Ionicons name="heart-outline" size={16} color="#71767b" />
            <Text style={styles.actionTxt}>{t.likes}</Text>
          </View>
          <View style={styles.action}>
            <MaterialCommunityIcons name="poll" size={16} color="#71767b" />
            <Text style={styles.actionTxt}>{t.views}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 14 }}>
            <Ionicons name="bookmark-outline" size={16} color="#71767b" />
            <Feather name="upload" size={16} color="#71767b" />
          </View>
        </View>
      </View>
    </View>
  );
}

export default function X() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
          }}
          style={styles.headerAvatar}
        />
        <FontAwesome6 name="x-twitter" size={26} color="#fff" />
        <Feather name="settings" size={20} color="#fff" />
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabActive}>For you</Text>
          <View style={styles.tabUnderline} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabInactive}>Following</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabInactive}>Tech</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Ionicons name="add" size={18} color="#71767b" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {TWEETS.map((t) => (
          <TweetCard key={t.id} t={t} />
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity style={styles.composeBtn}>
        <FontAwesome6 name="feather" size={22} color="#fff" />
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <BottomTab icon="home" active />
        <BottomTab icon="search" />
        <BottomTab icon="people-outline" />
        <BottomTab icon="notifications-outline" />
        <BottomTab icon="mail-outline" />
      </View>
    </View>
  );
}

function BottomTab({ icon, active }: { icon: string; active?: boolean }) {
  const color = active ? "#fff" : "#71767b";
  return (
    <TouchableOpacity style={styles.btmTab}>
      <Ionicons name={icon as any} size={26} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 6,
  },
  headerAvatar: { width: 32, height: 32, borderRadius: 16 },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#2f3336",
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  tabActive: { color: "#fff", fontSize: 15, fontWeight: "700" },
  tabInactive: { color: "#71767b", fontSize: 15, fontWeight: "500" },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#1d9bf0",
  },
  tweet: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#2f3336",
    gap: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#222" },
  tweetHeader: { flexDirection: "row", alignItems: "center", gap: 4 },
  name: { color: "#fff", fontSize: 14, fontWeight: "700" },
  verifiedBadge: { marginLeft: 0 },
  handle: { color: "#71767b", fontSize: 14 },
  dot: { color: "#71767b", fontSize: 14 },
  text: { color: "#e7e9ea", fontSize: 15, lineHeight: 20, marginTop: 2 },
  tweetImage: {
    width: "100%",
    aspectRatio: 16 / 10,
    borderRadius: 14,
    marginTop: 10,
    backgroundColor: "#111",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingRight: 10,
  },
  action: { flexDirection: "row", alignItems: "center", gap: 5 },
  actionTxt: { color: "#71767b", fontSize: 12 },
  composeBtn: {
    position: "absolute",
    bottom: 90,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1d9bf0",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1d9bf0",
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  bottomBar: {
    flexDirection: "row",
    backgroundColor: "#000",
    borderTopWidth: 0.5,
    borderTopColor: "#2f3336",
    paddingTop: 10,
    paddingBottom: 24,
  },
  btmTab: { flex: 1, alignItems: "center" },
});
