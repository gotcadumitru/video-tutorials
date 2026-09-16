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

const STREAM =
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&q=80";
const STREAMER =
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80";

const CHAT = [
  { user: "pixelDruid", color: "#ff75e6", text: "that clutch was INSANE" },
  { user: "nova_watts", color: "#00e6cb", text: "CLIP IT CLIP IT" },
  { user: "ghostbyte", color: "#ffb31a", text: "chat we eating good tonight" },
  { user: "shen_v2", color: "#9147ff", text: "LETSGOOO 🔥🔥🔥" },
  { user: "mika.exe", color: "#5cb0ff", text: "how is he still alive lol" },
  { user: "trufflepig", color: "#7dff8a", text: "W streamer" },
];

export default function Twitch() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <ImageBackground source={{ uri: STREAM }} style={styles.stream}>
        <View style={styles.streamTop}>
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <View style={styles.viewers}>
            <Ionicons name="eye-outline" size={13} color="#fff" />
            <Text style={styles.viewersText}>128K</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.streamerRow}>
        <Image source={{ uri: STREAMER }} style={styles.streamerAvatar} />
        <View style={styles.streamerInfo}>
          <Text style={styles.streamerName}>NightShade</Text>
          <Text style={styles.streamerGame}>Apex Legends · Ranked grind</Text>
        </View>
        <TouchableOpacity style={styles.followBtn}>
          <Ionicons name="heart" size={15} color="#fff" />
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subBtn}>
          <Ionicons name="star-outline" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.chatHeader}>
        <Text style={styles.chatTitle}>STREAM CHAT</Text>
        <Ionicons name="people-outline" size={15} color="#8e8e93" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chat}
      >
        {CHAT.map((message) => (
          <Text key={message.user} style={styles.chatLine}>
            <Text style={[styles.chatUser, { color: message.color }]}>
              {message.user}
            </Text>
            <Text style={styles.chatText}>: {message.text}</Text>
          </Text>
        ))}
      </ScrollView>

      <View style={styles.inputBar}>
        <View style={styles.input}>
          <Text style={styles.inputPlaceholder}>Send a message</Text>
        </View>
        <TouchableOpacity style={styles.bitsBtn}>
          <Ionicons name="diamond-outline" size={19} color="#9147ff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendBtn}>
          <Ionicons name="send" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0e0e10",
  },
  stream: {
    height: 250,
    marginTop: 56,
  },
  streamTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
  },
  liveBadge: {
    backgroundColor: "#eb0400",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  liveText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
  },
  viewers: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  viewersText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  streamerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
  },
  streamerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#9147ff",
  },
  streamerInfo: {
    flex: 1,
    gap: 2,
  },
  streamerName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
  streamerGame: {
    color: "#9147ff",
    fontSize: 12,
    fontWeight: "600",
  },
  followBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#9147ff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 13,
  },
  followText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  subBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#26262c",
    alignItems: "center",
    justifyContent: "center",
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#26262c",
    borderBottomWidth: 0.5,
    borderBottomColor: "#26262c",
  },
  chatTitle: {
    color: "#8e8e93",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  chat: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  chatLine: {
    fontSize: 13.5,
    lineHeight: 19,
  },
  chatUser: {
    fontWeight: "800",
  },
  chatText: {
    color: "#e5e7eb",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 30,
    borderTopWidth: 0.5,
    borderTopColor: "#26262c",
  },
  input: {
    flex: 1,
    backgroundColor: "#26262c",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  inputPlaceholder: {
    color: "#8e8e93",
    fontSize: 13,
  },
  bitsBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#26262c",
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#9147ff",
    alignItems: "center",
    justifyContent: "center",
  },
});
