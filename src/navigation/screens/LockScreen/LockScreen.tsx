import React from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const WALLPAPER =
  "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=900&q=80";

const NOTIFICATIONS = [
  {
    app: "Messages",
    icon: "chatbubble",
    color: "#30d158",
    title: "Emma",
    body: "dinner tonight? 🍜",
    time: "now",
  },
  {
    app: "Instagram",
    icon: "camera",
    color: "#ff375f",
    title: "Instagram",
    body: "luna.creates liked your story",
    time: "9m ago",
  },
] as const;

export default function LockScreen() {
  return (
    <ImageBackground source={{ uri: WALLPAPER }} style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.dim} />

      <View style={styles.top}>
        <Ionicons name="lock-closed" size={20} color="rgba(255,255,255,0.85)" />
        <Text style={styles.date}>Friday, July 11</Text>
        <Text style={styles.clock}>9:41</Text>
      </View>

      <View style={styles.notifications}>
        {NOTIFICATIONS.map((notification) => (
          <View key={notification.app} style={styles.notification}>
            <View
              style={[styles.appIcon, { backgroundColor: notification.color }]}
            >
              <Ionicons name={notification.icon} size={18} color="#fff" />
            </View>
            <View style={styles.notificationBody}>
              <View style={styles.notificationTop}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              <Text style={styles.notificationText}>{notification.body}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.quickBtn}>
          <Ionicons name="flashlight" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn}>
          <Ionicons name="camera" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.homeIndicator} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  dim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  top: {
    marginTop: 70,
    alignItems: "center",
    gap: 2,
  },
  date: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 19,
    fontWeight: "600",
    marginTop: 14,
  },
  clock: {
    color: "#fff",
    fontSize: 84,
    fontWeight: "200",
    letterSpacing: -2,
    marginTop: -6,
  },
  notifications: {
    marginTop: 26,
    paddingHorizontal: 14,
    gap: 10,
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(60,60,70,0.55)",
    borderRadius: 22,
    padding: 14,
  },
  appIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBody: {
    flex: 1,
    gap: 1,
  },
  notificationTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notificationTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  notificationTime: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
  },
  notificationText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
  },
  bottom: {
    marginTop: "auto",
    marginBottom: 40,
    paddingHorizontal: 46,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(40,40,50,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  homeIndicator: {
    alignSelf: "center",
    width: 140,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
});
