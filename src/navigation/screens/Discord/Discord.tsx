import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type Msg = {
  id: string;
  user: string;
  color: string;
  avatar: string;
  time: string;
  text?: string;
  image?: string;
  reply?: { user: string; text: string };
};

const MESSAGES: Msg[] = [
  {
    id: "1",
    user: "lunaCodes",
    color: "#5865F2",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    time: "Today at 2:14 PM",
    text: "yo did anyone see the new react native release? gesture handler 3 is INSANE",
  },
  {
    id: "2",
    user: "kael.dev",
    color: "#EB459E",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    time: "Today at 2:15 PM",
    text: "yeah just upgraded yesterday. animations finally feel native",
  },
  {
    id: "3",
    user: "kael.dev",
    color: "#EB459E",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    time: "Today at 2:15 PM",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=900&q=80",
  },
  {
    id: "4",
    user: "marisol",
    color: "#57F287",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    time: "Today at 2:18 PM",
    reply: {
      user: "lunaCodes",
      text: "yo did anyone see the new react native release?...",
    },
    text: "the new worklets api is what got me. dropped frames went from 12% to 0",
  },
  {
    id: "5",
    user: "atlas",
    color: "#FEE75C",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80",
    time: "Today at 2:21 PM",
    text: "okay i'm sold. updating tonight",
  },
  {
    id: "6",
    user: "lunaCodes",
    color: "#5865F2",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    time: "Today at 2:22 PM",
    text: "lmk how it goes",
  },
];

function Message({ msg }: { msg: Msg }) {
  return (
    <View style={styles.msgRow}>
      <Image source={{ uri: msg.avatar }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        {msg.reply && (
          <View style={styles.replyRow}>
            <View style={styles.replyConnector} />
            <Ionicons name="arrow-undo" size={12} color="#949ba4" />
            <Text style={styles.replyUser}>@{msg.reply.user}</Text>
            <Text style={styles.replyText} numberOfLines={1}>
              {msg.reply.text}
            </Text>
          </View>
        )}
        <View style={styles.headerRow}>
          <Text style={[styles.userName, { color: msg.color }]}>
            {msg.user}
          </Text>
          <Text style={styles.time}>{msg.time}</Text>
        </View>
        {msg.text && <Text style={styles.msgText}>{msg.text}</Text>}
        {msg.image && (
          <Image source={{ uri: msg.image }} style={styles.msgImage} />
        )}
      </View>
    </View>
  );
}

const SERVERS = [
  {
    id: "rn",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&q=80",
    active: true,
  },
  {
    id: "design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=200&q=80",
  },
  {
    id: "art",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&q=80",
  },
  {
    id: "music",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80",
  },
];

export default function Discord() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.body}>
        {/* server rail */}
        <View style={styles.rail}>
          <View style={styles.homeServer}>
            <FontAwesome5 name="discord" size={22} color="#fff" />
          </View>
          <View style={styles.railDivider} />
          {SERVERS.map((s) => (
            <View key={s.id} style={styles.serverWrap}>
              {s.active && <View style={styles.activeBar} />}
              <Image
                source={{ uri: s.image }}
                style={[
                  styles.serverIcon,
                  s.active && { borderRadius: 14 },
                ]}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.addServer}>
            <Ionicons name="add" size={22} color="#23a55a" />
          </TouchableOpacity>
        </View>

        {/* main */}
        <View style={styles.main}>
          <View style={styles.topBar}>
            <View style={styles.channelTitleRow}>
              <Text style={styles.hash}>#</Text>
              <Text style={styles.channel}>react-native</Text>
            </View>
            <View style={styles.topActions}>
              <Ionicons name="notifications-outline" size={22} color="#b5bac1" />
              <FontAwesome5 name="thumbtack" size={16} color="#b5bac1" />
              <Ionicons name="people" size={22} color="#b5bac1" />
              <Ionicons name="search" size={22} color="#b5bac1" />
            </View>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingVertical: 12 }}
          >
            <View style={styles.welcomeBlock}>
              <View style={styles.welcomeHash}>
                <Text style={{ color: "#fff", fontSize: 32, fontWeight: "900" }}>
                  #
                </Text>
              </View>
              <Text style={styles.welcomeTitle}>
                Welcome to #react-native!
              </Text>
              <Text style={styles.welcomeSub}>
                This is the start of the #react-native channel.
              </Text>
            </View>

            {MESSAGES.map((m) => (
              <Message key={m.id} msg={m} />
            ))}
          </ScrollView>

          <View style={styles.inputBar}>
            <TouchableOpacity style={styles.plusBtn}>
              <Ionicons name="add-circle" size={26} color="#b5bac1" />
            </TouchableOpacity>
            <TextInput
              placeholder="Message #react-native"
              placeholderTextColor="#6d6f78"
              style={styles.input}
            />
            <View style={styles.inputIcons}>
              <MaterialCommunityIcons name="gift-outline" size={22} color="#b5bac1" />
              <MaterialCommunityIcons name="sticker-emoji" size={22} color="#b5bac1" />
              <Ionicons name="happy-outline" size={22} color="#b5bac1" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#1e1f22", paddingTop: 50 },
  body: { flex: 1, flexDirection: "row" },
  rail: {
    width: 72,
    backgroundColor: "#1e1f22",
    alignItems: "center",
    paddingTop: 8,
    gap: 8,
  },
  homeServer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#5865f2",
    alignItems: "center",
    justifyContent: "center",
  },
  railDivider: {
    width: 32,
    height: 2,
    backgroundColor: "#2b2d31",
    borderRadius: 1,
    marginVertical: 4,
  },
  serverWrap: { width: 48, height: 48, justifyContent: "center" },
  activeBar: {
    position: "absolute",
    left: -12,
    top: 8,
    bottom: 8,
    width: 4,
    borderRadius: 2,
    backgroundColor: "#fff",
  },
  serverIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#313338",
  },
  addServer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2b2d31",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  main: {
    flex: 1,
    backgroundColor: "#313338",
    borderTopLeftRadius: 14,
    overflow: "hidden",
  },
  topBar: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    backgroundColor: "#313338",
    borderBottomWidth: 1,
    borderBottomColor: "#26272b",
  },
  channelTitleRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  hash: { color: "#80848e", fontSize: 22, fontWeight: "700" },
  channel: { color: "#fff", fontSize: 16, fontWeight: "700" },
  topActions: { flexDirection: "row", alignItems: "center", gap: 14 },
  welcomeBlock: { paddingHorizontal: 16, paddingVertical: 14 },
  welcomeHash: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#404249",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  welcomeTitle: { color: "#fff", fontSize: 26, fontWeight: "800" },
  welcomeSub: { color: "#b5bac1", fontSize: 14, marginTop: 4 },
  msgRow: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 12,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#2b2d31" },
  replyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
    marginLeft: -12,
  },
  replyConnector: {
    width: 28,
    height: 12,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#4e5058",
    borderTopLeftRadius: 6,
    marginRight: 4,
  },
  replyUser: { color: "#dbdee1", fontSize: 12, fontWeight: "700" },
  replyText: { color: "#949ba4", fontSize: 12, flex: 1 },
  headerRow: { flexDirection: "row", alignItems: "baseline", gap: 8 },
  userName: { fontSize: 15, fontWeight: "700" },
  time: { color: "#80848e", fontSize: 11 },
  msgText: { color: "#dbdee1", fontSize: 14, lineHeight: 20, marginTop: 2 },
  msgImage: {
    width: 220,
    height: 140,
    borderRadius: 8,
    marginTop: 6,
    backgroundColor: "#2b2d31",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#383a40",
    margin: 8,
    marginBottom: 18,
    borderRadius: 22,
    paddingLeft: 6,
    paddingRight: 12,
    height: 44,
  },
  plusBtn: { padding: 4 },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    paddingHorizontal: 8,
  },
  inputIcons: { flexDirection: "row", gap: 12, alignItems: "center" },
});
