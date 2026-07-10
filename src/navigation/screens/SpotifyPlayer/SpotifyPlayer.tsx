import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

const TRACK = {
  title: "Midnight Drive",
  artist: "Solène Rivera",
  album:
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&q=80",
  duration: 218, // seconds
};

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function SpotifyPlayer() {
  const [pos, setPos] = useState(74);
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(true);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#5b2a86", "#2a1340", "#0a0510", "#000"]}
        locations={[0, 0.4, 0.8, 1]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <TouchableOpacity>
            <Ionicons name="chevron-down" size={26} color="#fff" />
          </TouchableOpacity>
          <View style={styles.topCenter}>
            <Text style={styles.topLabel}>PLAYING FROM PLAYLIST</Text>
            <Text style={styles.topPlaylist}>Late Night Tape</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.artWrap}>
          <Image source={{ uri: TRACK.album }} style={styles.art} />
        </View>

        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.trackTitle} numberOfLines={1}>
              {TRACK.title}
            </Text>
            <Text style={styles.trackArtist}>{TRACK.artist}</Text>
          </View>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={28}
              color={liked ? "#1DB954" : "#fff"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.sliderWrap}>
          <Slider
            value={pos}
            minimumValue={0}
            maximumValue={TRACK.duration}
            onValueChange={setPos}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="rgba(255,255,255,0.25)"
            thumbTintColor="#fff"
            style={styles.slider}
          />
          <View style={styles.timeRow}>
            <Text style={styles.timeTxt}>{fmt(pos)}</Text>
            <Text style={styles.timeTxt}>-{fmt(TRACK.duration - pos)}</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="shuffle-variant" size={22} color="#1DB954" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-skip-back" size={36} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => setPlaying((p) => !p)}
          >
            <Ionicons
              name={playing ? "pause" : "play"}
              size={32}
              color="#000"
              style={{ marginLeft: playing ? 0 : 3 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-skip-forward" size={36} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="repeat" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.deviceRow}>
            <MaterialCommunityIcons name="speaker" size={18} color="#1DB954" />
            <Text style={styles.deviceTxt}>Living Room HomePod</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 18 }}>
            <Ionicons name="share-outline" size={20} color="#fff" />
            <Ionicons name="list" size={20} color="#fff" />
          </View>
        </View>

        <View style={styles.lyricsCard}>
          <View style={styles.lyricsHeader}>
            <Text style={styles.lyricsTitle}>Lyrics</Text>
            <View style={{ flexDirection: "row", gap: 14 }}>
              <Feather name="maximize-2" size={16} color="#fff" />
              <Ionicons name="ellipsis-horizontal" size={16} color="#fff" />
            </View>
          </View>
          <Text style={[styles.lyricLine, { color: "rgba(255,255,255,0.45)" }]}>
            Tail lights bleeding into rain
          </Text>
          <Text style={[styles.lyricLine, styles.lyricActive]}>
            City humming like an engine
          </Text>
          <Text style={[styles.lyricLine, { color: "rgba(255,255,255,0.45)" }]}>
            We could disappear tonight
          </Text>
        </View>

        <View style={styles.creditsCard}>
          <View style={styles.creditsHeader}>
            <Text style={styles.creditsTitle}>About the artist</Text>
          </View>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
            }}
            style={styles.artistImg}
          />
          <View style={styles.artistOverlay}>
            <Text style={styles.artistName}>Solène Rivera</Text>
            <Text style={styles.artistListeners}>2,184,392 monthly listeners</Text>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followTxt}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  scroll: { paddingHorizontal: 22, paddingTop: 60, paddingBottom: 40 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topCenter: { alignItems: "center" },
  topLabel: { color: "#fff", fontSize: 10, fontWeight: "700", letterSpacing: 1.5 },
  topPlaylist: { color: "#fff", fontSize: 13, fontWeight: "700", marginTop: 2 },
  artWrap: {
    marginTop: 36,
    alignItems: "center",
  },
  art: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 6,
    backgroundColor: "#222",
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 28,
  },
  trackTitle: { color: "#fff", fontSize: 22, fontWeight: "800" },
  trackArtist: { color: "#b3b3b3", fontSize: 15, marginTop: 4 },
  sliderWrap: { marginTop: 18 },
  slider: { width: "100%", height: 30 },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -2,
  },
  timeTxt: { color: "#b3b3b3", fontSize: 11, fontWeight: "600" },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },
  playBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 26,
  },
  deviceRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  deviceTxt: { color: "#1DB954", fontSize: 12, fontWeight: "700" },
  lyricsCard: {
    marginTop: 26,
    backgroundColor: "#5b2a86",
    borderRadius: 10,
    padding: 18,
  },
  lyricsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  lyricsTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },
  lyricLine: { fontSize: 22, fontWeight: "800", lineHeight: 30 },
  lyricActive: { color: "#fff" },
  creditsCard: {
    marginTop: 22,
    backgroundColor: "#181818",
    borderRadius: 10,
    overflow: "hidden",
  },
  creditsHeader: { padding: 14 },
  creditsTitle: { color: "#fff", fontSize: 16, fontWeight: "800" },
  artistImg: { width: "100%", height: 180, backgroundColor: "#222" },
  artistOverlay: { padding: 14 },
  artistName: { color: "#fff", fontSize: 18, fontWeight: "800" },
  artistListeners: { color: "#b3b3b3", fontSize: 12, marginTop: 2 },
  followBtn: {
    marginTop: 12,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#727272",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
  },
  followTxt: { color: "#fff", fontWeight: "700", fontSize: 13 },
});
