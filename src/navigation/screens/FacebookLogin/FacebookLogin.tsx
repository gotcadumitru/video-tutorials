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

export default function FacebookLogin() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>facebook</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Mobile number or email"
            placeholderTextColor="#8a8d91"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8a8d91"
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginBtn} activeOpacity={0.85}>
            <Text style={styles.loginTxt}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgot}>Forgotten password?</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.or}>or</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
            <FontAwesome name="google" size={18} color="#fff" />
            <Text style={styles.socialTxt}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
            <FontAwesome name="apple" size={20} color="#fff" />
            <Text style={styles.socialTxt}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createBtn} activeOpacity={0.85}>
            <Text style={styles.createTxt}>Create new account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.metaRow}>
            <Ionicons name="logo-facebook" size={14} color="#8a8d91" />
            <Text style={styles.metaTxt}>Meta</Text>
          </View>
          <View style={styles.linksRow}>
            <Text style={styles.linkTxt}>About</Text>
            <Text style={styles.linkDot}>·</Text>
            <Text style={styles.linkTxt}>Help</Text>facebook
          </View>
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
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 36,
    justifyContent: "space-between",
  },
  logoWrap: {
    alignItems: "center",
    marginBottom: 60,
  },
  logo: {
    fontSize: 56,
    fontWeight: "800",
    color: "#1877f2",
    letterSpacing: -2,
  },
  form: {
    gap: 12,
  },
  input: {
    height: 52,
    borderRadius: 10,
    backgroundColor: "#1c1e21",
    borderWidth: 1,
    borderColor: "#3a3b3c",
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 15,
  },
  loginBtn: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#1877f2",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  loginTxt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  forgot: {
    color: "#e4e6eb",
    fontSize: 14,
    textAlign: "center",
    marginTop: 14,
    marginBottom: 6,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#3a3b3c",
  },
  or: {
    color: "#8a8d91",
    fontSize: 12,
    fontWeight: "600",
    marginHorizontal: 14,
    textTransform: "uppercase",
  },
  socialBtn: {
    height: 48,
    borderRadius: 10,
    backgroundColor: "#1c1e21",
    borderWidth: 1,
    borderColor: "#3a3b3c",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  socialTxt: {
    color: "#e4e6eb",
    fontSize: 15,
    fontWeight: "600",
  },
  createBtn: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#1877f2",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  createTxt: {
    color: "#1877f2",
    fontSize: 15,
    fontWeight: "700",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
    gap: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaTxt: {
    color: "#8a8d91",
    fontSize: 12,
    fontWeight: "600",
  },
  linksRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  linkTxt: {
    color: "#8a8d91",
    fontSize: 12,
  },
  linkDot: {
    color: "#8a8d91",
    fontSize: 12,
  },
});
