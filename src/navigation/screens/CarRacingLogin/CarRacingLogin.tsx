import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function CarRacingLogin() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
        }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["rgba(10,10,10,0.55)", "rgba(10,10,10,0.88)", "#0a0a0a"]}
        locations={[0, 0.45, 0.75]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.top}>
          <View style={styles.badge}>
            <Ionicons name="speedometer" size={30} color="#E31937" />
          </View>
          <Text style={styles.brand}>VELOCITY</Text>
          <Text style={styles.sub}>RACING CLUB</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Sign In</Text>

          <Text style={styles.label}>Full Name</Text>
          <View style={styles.field}>
            <Ionicons name="person-outline" size={18} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor="#555"
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.field}>
            <Ionicons name="mail-outline" size={18} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="you@email.com"
              placeholderTextColor="#555"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.field}>
            <Ionicons name="lock-closed-outline" size={18} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#555"
              secureTextEntry
            />
            <TouchableOpacity>
              <Ionicons name="eye-off-outline" size={18} color="#555" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.consent} activeOpacity={0.7}>
            <View style={styles.check}>
              <Ionicons name="checkmark" size={13} color="transparent" />
            </View>
            <Text style={styles.consentTxt}>
              I agree to the <Text style={styles.link}>Terms</Text> &{" "}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85}>
            <LinearGradient
              colors={["#E31937", "#ad1229"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.btn}
            >
              <Text style={styles.btnTxt}>LOG IN</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.or}>OR</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socials}>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
              <FontAwesome name="google" size={18} color="#fff" />
              <Text style={styles.socialTxt}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialBtn, styles.appleBtn]}
              activeOpacity={0.8}
            >
              <FontAwesome name="apple" size={20} color="#fff" />
              <Text style={styles.socialTxt}>Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
            }}
            style={styles.bottomImg}
            imageStyle={{ borderRadius: 12, opacity: 0.35 }}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["transparent", "rgba(227,25,55,0.35)"]}
              style={styles.bottomOverlay}
            >
              <Ionicons name="trophy" size={16} color="#E31937" />
              <Text style={styles.bottomTxt}>Season 2026 Open</Text>
            </LinearGradient>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 64,
    paddingBottom: 36,
  },
  top: {
    alignItems: "center",
    marginBottom: 30,
  },
  badge: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: "rgba(227,25,55,0.12)",
    borderWidth: 1.5,
    borderColor: "rgba(227,25,55,0.4)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  brand: {
    fontSize: 26,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 5,
  },
  sub: {
    fontSize: 10,
    color: "#E31937",
    letterSpacing: 4,
    fontWeight: "700",
    marginTop: 2,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 22,
  },
  label: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },
  consent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    marginTop: 2,
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },
  consentTxt: {
    flex: 1,
    fontSize: 12.5,
    color: "#888",
  },
  link: {
    color: "#E31937",
    fontWeight: "600",
  },
  btn: {
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  btnTxt: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  or: {
    color: "#555",
    fontSize: 11,
    fontWeight: "600",
    marginHorizontal: 14,
  },
  socials: {
    flexDirection: "row",
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  appleBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  socialTxt: {
    color: "#ddd",
    fontSize: 13.5,
    fontWeight: "600",
  },
  bottom: {
    marginTop: 24,
  },
  bottomImg: {
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
  },
  bottomOverlay: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 12,
    gap: 6,
  },
  bottomTxt: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
