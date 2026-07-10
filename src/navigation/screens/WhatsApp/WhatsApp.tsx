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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

type Bubble =
  | { id: string; from: "me" | "them"; type: "text"; text: string; time: string; status?: "read" | "delivered" }
  | { id: string; from: "me" | "them"; type: "image"; uri: string; time: string; status?: "read" | "delivered"; caption?: string }
  | { id: string; from: "me" | "them"; type: "voice"; duration: string; time: string; status?: "read" | "delivered" }
  | { id: string; from: "them"; type: "system"; text: string };

const MESSAGES: Bubble[] = [
  { id: "0", from: "them", type: "system", text: "TODAY" },
  { id: "1", from: "them", type: "text", text: "okay so wedding venue is officially booked!!", time: "10:42" },
  { id: "2", from: "them", type: "image", uri: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80", time: "10:42", caption: "this is the spot" },
  { id: "3", from: "me", type: "text", text: "WAIT this is gorgeous", time: "10:43", status: "read" },
  { id: "4", from: "me", type: "text", text: "the lighting at sunset is going to be unreal", time: "10:43", status: "read" },
  { id: "5", from: "them", type: "text", text: "right?? we need to start thinking about the bridesmaid dresses", time: "10:45" },
  { id: "6", from: "me", type: "voice", duration: "0:18", time: "10:46", status: "delivered" },
  { id: "7", from: "them", type: "text", text: "haha okay calling you in 5", time: "10:48" },
];

function MessageBubble({ b }: { b: Bubble }) {
  if (b.type === "system") {
    return (
      <View style={styles.systemRow}>
        <View style={styles.systemPill}>
          <Text style={styles.systemTxt}>{b.text}</Text>
        </View>
      </View>
    );
  }

  const isMe = b.from === "me";
  const bubbleStyle = isMe ? styles.bubbleMe : styles.bubbleThem;
  const tail = isMe ? styles.tailMe : styles.tailThem;

  const Status = b.from === "me" && b.status && (
    <View style={{ marginLeft: 4 }}>
      <Ionicons
        name="checkmark-done"
        size={14}
        color={b.status === "read" ? "#53bdeb" : "rgba(255,255,255,0.6)"}
      />
    </View>
  );

  return (
    <View
      style={[
        styles.row,
        { justifyContent: isMe ? "flex-end" : "flex-start" },
      ]}
    >
      <View style={[styles.bubble, bubbleStyle]}>
        <View style={tail} />

        {b.type === "text" && (
          <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-end" }}>
            <Text style={styles.bubbleText}>{b.text}</Text>
            <View style={styles.metaInline}>
              <Text style={styles.timeTxt}>{b.time}</Text>
              {Status}
            </View>
          </View>
        )}

        {b.type === "image" && (
          <View>
            <Image source={{ uri: b.uri }} style={styles.imageBubble} />
            {b.caption && <Text style={[styles.bubbleText, { marginTop: 6 }]}>{b.caption}</Text>}
            <View style={styles.metaInline}>
              <Text style={styles.timeTxt}>{b.time}</Text>
              {Status}
            </View>
          </View>
        )}

        {b.type === "voice" && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 2 }}>
            <View style={styles.voiceAvatar}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
                }}
                style={{ width: 36, height: 36, borderRadius: 18 }}
              />
              <View style={styles.voiceMic}>
                <Ionicons name="mic" size={10} color="#fff" />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.waveform}>
                {Array.from({ length: 26 }).map((_, i) => {
                  const heights = [4, 8, 14, 18, 22, 16, 10, 6, 12, 18, 24, 20, 14, 8, 6, 12, 18, 22, 16, 10, 6, 4, 8, 12, 6, 4];
                  return (
                    <View
                      key={i}
                      style={{
                        width: 2,
                        height: heights[i],
                        borderRadius: 1,
                        backgroundColor: i < 8 ? "#53bdeb" : "rgba(255,255,255,0.45)",
                      }}
                    />
                  );
                })}
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
                <Text style={styles.voiceDur}>{b.duration}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Text style={styles.timeTxt}>{b.time}</Text>
                  {Status}
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.playMini}>
              <Ionicons name="play" size={16} color="#0b141a" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

export default function WhatsApp() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
          }}
          style={styles.headerAvatar}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.headerName}>Sophie</Text>
          <Text style={styles.headerStatus}>online</Text>
        </View>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="videocam" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <MaterialIcons name="call" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        {/* doodle texture */}
        <View style={styles.doodleLayer} pointerEvents="none">
          {Array.from({ length: 40 }).map((_, i) => (
            <Ionicons
              key={i}
              name="leaf-outline"
              size={20 + (i % 3) * 6}
              color="rgba(255,255,255,0.025)"
              style={{
                position: "absolute",
                left: (i * 47) % 360,
                top: (i * 83) % 700,
                transform: [{ rotate: `${i * 23}deg` }],
              }}
            />
          ))}
        </View>

        <ScrollView
          contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 8 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.encryptionNotice}>
            <MaterialIcons name="lock" size={12} color="#ffd279" />
            <Text style={styles.encryptionTxt}>
              Messages and calls are end-to-end encrypted. Tap to learn more.
            </Text>
          </View>

          {MESSAGES.map((m) => (
            <MessageBubble key={m.id} b={m} />
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <View style={styles.inputBox}>
            <TouchableOpacity>
              <Ionicons name="happy-outline" size={24} color="#aebac1" />
            </TouchableOpacity>
            <TextInput
              placeholder="Message"
              placeholderTextColor="#7d8a93"
              style={styles.input}
            />
            <TouchableOpacity>
              <MaterialCommunityIcons name="paperclip" size={22} color="#aebac1" style={{ transform: [{ rotate: "-45deg" }] }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 12 }}>
              <Feather name="dollar-sign" size={20} color="#aebac1" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 12 }}>
              <Ionicons name="camera" size={22} color="#aebac1" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sendBtn}>
            <MaterialCommunityIcons name="microphone" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0b141a" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingTop: 50,
    paddingBottom: 8,
    backgroundColor: "#1f2c33",
  },
  backBtn: { padding: 4 },
  headerAvatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: "#222" },
  headerName: { color: "#e9edef", fontSize: 16, fontWeight: "700" },
  headerStatus: { color: "#aebac1", fontSize: 12, marginTop: 1 },
  headerIcon: { paddingHorizontal: 10 },
  body: { flex: 1, backgroundColor: "#0b141a" },
  doodleLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  encryptionNotice: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(36, 45, 50, 0.95)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
    maxWidth: "85%",
  },
  encryptionTxt: { color: "#ffd279", fontSize: 11, textAlign: "center", flexShrink: 1 },
  systemRow: { alignItems: "center", marginVertical: 8 },
  systemPill: {
    backgroundColor: "rgba(36, 45, 50, 0.95)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  systemTxt: { color: "#aebac1", fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
  row: { width: "100%", marginVertical: 2, paddingHorizontal: 4 },
  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    position: "relative",
  },
  bubbleMe: { backgroundColor: "#005c4b", borderTopRightRadius: 0 },
  bubbleThem: { backgroundColor: "#1f2c33", borderTopLeftRadius: 0 },
  tailMe: {
    position: "absolute",
    top: 0,
    right: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderLeftColor: "#005c4b",
    borderBottomWidth: 6,
    borderBottomColor: "transparent",
  },
  tailThem: {
    position: "absolute",
    top: 0,
    left: -6,
    width: 0,
    height: 0,
    borderRightWidth: 6,
    borderRightColor: "#1f2c33",
    borderBottomWidth: 6,
    borderBottomColor: "transparent",
  },
  bubbleText: { color: "#e9edef", fontSize: 15, lineHeight: 20, flex: 0 },
  metaInline: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    paddingLeft: 8,
    paddingTop: 2,
  },
  timeTxt: { color: "rgba(255,255,255,0.55)", fontSize: 10 },
  imageBubble: {
    width: 240,
    height: 280,
    borderRadius: 6,
    backgroundColor: "#222",
  },
  voiceAvatar: { position: "relative" },
  voiceMic: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#00a884",
    alignItems: "center",
    justifyContent: "center",
  },
  waveform: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    height: 24,
  },
  voiceDur: { color: "rgba(255,255,255,0.55)", fontSize: 11 },
  playMini: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingBottom: 18,
    paddingTop: 6,
    gap: 6,
  },
  inputBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2c33",
    borderRadius: 24,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  input: { flex: 1, color: "#fff", fontSize: 15 },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#00a884",
    alignItems: "center",
    justifyContent: "center",
  },
});
