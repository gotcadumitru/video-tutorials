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
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

const TOP_ARTISTS = [
  {
    rank: 1,
    name: "Midnight Pulse",
    plays: "1,204 streams",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80",
  },
  {
    rank: 2,
    name: "Nova Ray",
    plays: "986 streams",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
  },
  {
    rank: 3,
    name: "Echo Delta",
    plays: "871 streams",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
  {
    rank: 4,
    name: "Velvet Skies",
    plays: "742 streams",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
  },
  {
    rank: 5,
    name: "Glass Animals",
    plays: "690 streams",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
  },
];

export default function SpotifyWrapped() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>Wrapped</Text>
          <TouchableOpacity>
            <Ionicons name="close" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={["#8b5cf6", "#ec4899", "#f97316"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Text style={styles.heroKicker}>YOU LISTENED FOR</Text>
          <Text style={styles.heroNumber}>42,081</Text>
          <Text style={styles.heroUnit}>minutes this year</Text>
          <View style={styles.heroFootnote}>
            <Ionicons name="flash" size={14} color="#fff" />
            <Text style={styles.heroFootnoteText}>
              That's more than 94% of listeners
            </Text>
          </View>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Your Top Artists</Text>
        <View style={styles.list}>
          {TOP_ARTISTS.map((artist) => (
            <View key={artist.rank} style={styles.artistRow}>
              <Text style={styles.rank}>{artist.rank}</Text>
              <Image source={{ uri: artist.image }} style={styles.artistArt} />
              <View style={styles.artistInfo}>
                <Text style={styles.artistName}>{artist.name}</Text>
                <Text style={styles.artistPlays}>{artist.plays}</Text>
              </View>
              {artist.rank === 1 && (
                <View style={styles.crown}>
                  <Ionicons name="star" size={13} color="#000" />
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.genreCard}>
          <Text style={styles.genreKicker}>TOP GENRE</Text>
          <Text style={styles.genreName}>Synthwave</Text>
          <View style={styles.genreBars}>
            {[86, 64, 48, 34, 22].map((bar, index) => (
              <View key={index} style={[styles.genreBar, { width: `${bar}%` }]} />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons name="share-outline" size={19} color="#000" />
          <Text style={styles.shareText}>Share your Wrapped</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  header: {
    marginTop: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  heroCard: {
    marginTop: 20,
    borderRadius: 24,
    padding: 26,
    alignItems: "center",
    gap: 4,
  },
  heroKicker: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
  },
  heroNumber: {
    color: "#fff",
    fontSize: 64,
    fontWeight: "900",
    letterSpacing: -2,
  },
  heroUnit: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 15,
    fontWeight: "600",
  },
  heroFootnote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 14,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  heroFootnoteText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 30,
  },
  list: {
    marginTop: 14,
    gap: 14,
  },
  artistRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  rank: {
    color: "#1ed760",
    fontSize: 17,
    fontWeight: "900",
    width: 18,
  },
  artistArt: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  artistInfo: {
    flex: 1,
    gap: 2,
  },
  artistName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  artistPlays: {
    color: "#9ca3af",
    fontSize: 12,
  },
  crown: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1ed760",
    alignItems: "center",
    justifyContent: "center",
  },
  genreCard: {
    marginTop: 28,
    backgroundColor: "#121212",
    borderRadius: 20,
    padding: 20,
    gap: 4,
  },
  genreKicker: {
    color: "#9ca3af",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
  },
  genreName: {
    color: "#1ed760",
    fontSize: 30,
    fontWeight: "900",
  },
  genreBars: {
    marginTop: 12,
    gap: 8,
  },
  genreBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1ed760",
    opacity: 0.85,
  },
  shareBtn: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#1ed760",
    borderRadius: 28,
    paddingVertical: 15,
  },
  shareText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "800",
  },
});
