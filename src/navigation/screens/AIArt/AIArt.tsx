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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const GENERATIONS = [
  "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80",
  "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80",
];

const STYLES = ["Cinematic", "Anime", "3D Render", "Photoreal"];

const ACTIONS = [
  { icon: "arrow-expand", label: "Upscale" },
  { icon: "shuffle-variant", label: "Vary" },
  { icon: "refresh", label: "Rerun" },
  { icon: "download-outline", label: "Save" },
] as const;

export default function AIArt() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <View style={styles.brand}>
            <Ionicons name="sparkles" size={20} color="#e879f9" />
            <Text style={styles.brandName}>Dreamer</Text>
          </View>
          <View style={styles.proBadge}>
            <Text style={styles.proText}>PRO</Text>
          </View>
        </View>

        <View style={styles.promptCard}>
          <Text style={styles.prompt}>
            A neon koi fish swimming through storm clouds, cinematic lighting
            --v 7
          </Text>
          <View style={styles.promptActions}>
            <TouchableOpacity style={styles.promptTool}>
              <MaterialCommunityIcons
                name="dice-multiple-outline"
                size={20}
                color="#9ca3af"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <LinearGradient
                colors={["#a855f7", "#ec4899"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sendBtn}
              >
                <Ionicons name="arrow-up" size={19} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.grid}>
          {GENERATIONS.map((generation, index) => (
            <View key={generation} style={styles.cell}>
              <Image source={{ uri: generation }} style={styles.cellImage} />
              <View style={styles.cellTag}>
                <Text style={styles.cellTagText}>V{index + 1}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          {ACTIONS.map((action) => (
            <TouchableOpacity key={action.label} style={styles.action}>
              <MaterialCommunityIcons
                name={action.icon}
                size={20}
                color="#e879f9"
              />
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Styles</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.styleChips}
        >
          {STYLES.map((style, index) => (
            <TouchableOpacity
              key={style}
              style={[styles.chip, index === 0 && styles.chipOn]}
            >
              <Text
                style={[styles.chipText, index === 0 && styles.chipTextOn]}
              >
                {style}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0a0a12",
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
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  proBadge: {
    backgroundColor: "rgba(232,121,249,0.15)",
    borderWidth: 1,
    borderColor: "rgba(232,121,249,0.5)",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 9,
  },
  proText: {
    color: "#e879f9",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  promptCard: {
    marginTop: 20,
    backgroundColor: "#13131f",
    borderWidth: 1,
    borderColor: "#232338",
    borderRadius: 18,
    padding: 16,
    gap: 14,
  },
  prompt: {
    color: "#e5e7eb",
    fontSize: 14,
    lineHeight: 21,
  },
  promptActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  promptTool: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1c1c2e",
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    marginTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  cell: {
    width: "48%",
    flexGrow: 1,
    aspectRatio: 1,
  },
  cellImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  cellTag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  cellTagText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
  },
  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#13131f",
    borderWidth: 1,
    borderColor: "#232338",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 13,
  },
  actionLabel: {
    color: "#e5e7eb",
    fontSize: 12,
    fontWeight: "700",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 28,
  },
  styleChips: {
    paddingTop: 12,
    gap: 8,
  },
  chip: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#232338",
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  chipOn: {
    backgroundColor: "rgba(232,121,249,0.12)",
    borderColor: "#e879f9",
  },
  chipText: {
    color: "#9ca3af",
    fontSize: 13,
    fontWeight: "600",
  },
  chipTextOn: {
    color: "#e879f9",
  },
});
