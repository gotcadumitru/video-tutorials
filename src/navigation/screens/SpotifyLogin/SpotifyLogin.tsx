import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function SpotifyLogin() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoWrap}>
          <View style={styles.logoCircle}>
            <FontAwesome name="spotify" size={56} color="#1DB954" />
          </View>
          <Text style={styles.brand}>Spotify</Text>
        </View>

        <Text style={styles.title}>Log in to Spotify</Text>

        <TouchableOpacity style={styles.socialBtn} activeOpacity={0.85}>
          <FontAwesome name="google" size={18} color="#fff" />
          <Text style={styles.socialTxt}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn} activeOpacity={0.85}>
          <FontAwesome name="apple" size={20} color="#fff" />
          <Text style={styles.socialTxt}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn} activeOpacity={0.85}>
          <FontAwesome name="facebook" size={18} color="#1877f2" />
          <Text style={styles.socialTxt}>Continue with Facebook</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.or}>or</Text>
          <View style={styles.line} />
        </View>

        <Text style={styles.label}>Email or username</Text>
        <TextInput
          style={styles.input}
          placeholder="Email or username"
          placeholderTextColor="#6a6a6a"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            placeholderTextColor="#6a6a6a"
            secureTextEntry
          />
          <TouchableOpacity style={styles.eyeBtn}>
            <Ionicons name="eye-off-outline" size={20} color="#a7a7a7" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBtn} activeOpacity={0.9}>
          <Text style={styles.loginTxt}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotWrap}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.signupTxt}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.signupLink}>Sign up for Spotify</Text>
          </TouchableOpacity>
        </View>
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
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 70,
    paddingBottom: 40,
  },
  logoWrap: {
    alignItems: "center",
    marginBottom: 28,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  brand: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 28,
  },
  socialBtn: {
    height: 50,
    borderRadius: 500,
    borderWidth: 1,
    borderColor: "#727272",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  socialTxt: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#292929",
  },
  or: {
    color: "#a7a7a7",
    fontSize: 13,
    fontWeight: "600",
    marginHorizontal: 14,
  },
  label: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    height: 50,
    borderRadius: 6,
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#292929",
    paddingHorizontal: 14,
    color: "#fff",
    fontSize: 15,
  },
  passwordRow: {
    position: "relative",
    justifyContent: "center",
  },
  passwordInput: {
    paddingRight: 44,
  },
  eyeBtn: {
    position: "absolute",
    right: 12,
    height: 50,
    justifyContent: "center",
  },
  loginBtn: {
    height: 50,
    borderRadius: 500,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  loginTxt: {
    color: "#000",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  forgotWrap: {
    alignItems: "center",
    marginTop: 20,
  },
  forgot: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 26,
  },
  signupTxt: {
    color: "#a7a7a7",
    fontSize: 14,
  },
  signupLink: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
