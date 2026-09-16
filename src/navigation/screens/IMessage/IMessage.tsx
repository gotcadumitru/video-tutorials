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

const AVATAR =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80";
const PHOTO =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80";

export default function IMessage() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Ionicons name="chevron-back" size={26} color="#0a84ff" />
        <View style={styles.headerCenter}>
          <Image source={{ uri: AVATAR }} style={styles.avatar} />
          <View style={styles.headerName}>
            <Text style={styles.name}>Alex</Text>
            <Ionicons name="chevron-forward" size={12} color="#8e8e93" />
          </View>
        </View>
        <Ionicons name="videocam-outline" size={26} color="#0a84ff" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.thread}
      >
        <Text style={styles.timestamp}>Today 9:38 PM</Text>

        <View style={[styles.bubble, styles.theirs]}>
          <Text style={styles.theirText}>did you get the tickets??</Text>
        </View>

        <View style={[styles.bubble, styles.mine]}>
          <Text style={styles.mineText}>YES. row G floor 😭🔥</Text>
        </View>

        <Image source={{ uri: PHOTO }} style={styles.photoBubble} />

        <View style={[styles.bubble, styles.theirs]}>
          <Text style={styles.theirText}>
            no way that's so close to the stage
          </Text>
        </View>

        <View style={[styles.bubble, styles.mine]}>
          <Text style={styles.mineText}>
            start saving for merch, we're going all out
          </Text>
        </View>
        <Text style={styles.receipt}>Read 9:41 PM</Text>

        <View style={[styles.bubble, styles.theirs, styles.typing]}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotMid]} />
          <View style={styles.dot} />
        </View>
      </ScrollView>

      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.plusBtn}>
          <Ionicons name="add" size={22} color="#8e8e93" />
        </TouchableOpacity>
        <View style={styles.input}>
          <Text style={styles.inputPlaceholder}>iMessage</Text>
          <Ionicons name="mic-outline" size={19} color="#8e8e93" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    marginTop: 56,
    paddingHorizontal: 14,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#1c1c1e",
  },
  headerCenter: {
    alignItems: "center",
    gap: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  name: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  thread: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 8,
  },
  timestamp: {
    textAlign: "center",
    color: "#8e8e93",
    fontSize: 11,
    marginBottom: 6,
  },
  bubble: {
    maxWidth: "75%",
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  theirs: {
    alignSelf: "flex-start",
    backgroundColor: "#26252a",
  },
  mine: {
    alignSelf: "flex-end",
    backgroundColor: "#0a84ff",
  },
  theirText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 21,
  },
  mineText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 21,
  },
  photoBubble: {
    alignSelf: "flex-end",
    width: 210,
    height: 150,
    borderRadius: 18,
  },
  receipt: {
    alignSelf: "flex-end",
    color: "#8e8e93",
    fontSize: 11,
    marginTop: -2,
    marginRight: 4,
  },
  typing: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 13,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#8e8e93",
  },
  dotMid: {
    opacity: 0.6,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 30,
  },
  plusBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#1c1c1e",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#2c2c2e",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  inputPlaceholder: {
    color: "#8e8e93",
    fontSize: 16,
  },
});
