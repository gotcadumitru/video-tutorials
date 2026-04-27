import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function SpeedRegister() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["transparent", "rgba(15,15,15,0.8)", "#0f0f0f"]}
          locations={[0, 0.4, 0.6]}
          style={styles.gradient}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.topSection}>
              <View style={styles.speedometer}>
                <Text style={styles.speedText}>🏁</Text>
                <View style={styles.speedRing} />
                <View style={styles.speedRing2} />
              </View>
            </View>

            <View style={styles.headerSection}>
              <Text style={styles.brandName}>VELOCITY</Text>
              <View style={styles.taglineContainer}>
                <View style={styles.redLine} />
                <Text style={styles.tagline}>RACING CLUB</Text>
                <View style={styles.redLine} />
              </View>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.formTitle}>CREATE ACCOUNT</Text>

              <View style={styles.inputContainer}>
                <View style={styles.iconBox}>
                  <Text style={styles.iconEmoji}>👤</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.iconBox}>
                  <Text style={styles.iconEmoji}>📧</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.iconBox}>
                  <Text style={styles.iconEmoji}>🔐</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#666"
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={styles.consentRow}>
                <View style={styles.customCheckbox}>
                  <View style={styles.checkboxInner} />
                </View>
                <Text style={styles.consentText}>
                  I accept the racing terms & conditions
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.registerButton}>
                <LinearGradient
                  colors={["#ff1744", "#d50000"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.registerGradient}
                >
                  <Text style={styles.registerText}>JOIN THE RACE</Text>
                  <Text style={styles.arrowIcon}>→</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.orSection}>
                <View style={styles.orLine} />
                <View style={styles.orBadge}>
                  <Text style={styles.orText}>OR CONTINUE WITH</Text>
                </View>
                <View style={styles.orLine} />
              </View>

              <View style={styles.socialRow}>
                <TouchableOpacity style={styles.googleBtn}>
                  <View style={styles.googleCircle}>
                    <Text style={styles.gLetter}>G</Text>
                  </View>
                  <Text style={styles.socialLabel}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.fbBtn}>
                  <View style={styles.fbCircle}>
                    <Text style={styles.fLetter}>f</Text>
                  </View>
                  <Text style={styles.socialLabel}>Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already a member?</Text>
              <TouchableOpacity>
                <Text style={styles.loginLink}> Sign In</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.carBadges}>
              <Text style={styles.badge}>🚗</Text>
              <Text style={styles.badge}>🏎️</Text>
              <Text style={styles.badge}>🚙</Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  topSection: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  speedometer: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  speedText: {
    fontSize: 32,
    zIndex: 10,
  },
  speedRing: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#ff1744",
    opacity: 0.5,
  },
  speedRing2: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: "#ff1744",
    opacity: 0.2,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  brandName: {
    fontSize: 42,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 8,
  },
  taglineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  redLine: {
    width: 30,
    height: 2,
    backgroundColor: "#ff1744",
  },
  tagline: {
    fontSize: 11,
    color: "#888",
    letterSpacing: 4,
    fontWeight: "600",
  },
  formCard: {
    backgroundColor: "rgba(20,20,20,0.95)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,23,68,0.2)",
  },
  formTitle: {
    fontSize: 13,
    color: "#ff1744",
    letterSpacing: 3,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 14,
    marginBottom: 14,
    overflow: "hidden",
  },
  iconBox: {
    width: 50,
    height: 54,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  iconEmoji: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: "#fff",
    fontSize: 15,
  },
  consentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  customCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#ff1744",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: "#ff1744",
  },
  consentText: {
    color: "#777",
    fontSize: 13,
    flex: 1,
  },
  registerButton: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 20,
  },
  registerGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    gap: 10,
  },
  registerText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 2,
  },
  arrowIcon: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
  },
  orSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#333",
  },
  orBadge: {
    paddingHorizontal: 12,
  },
  orText: {
    color: "#555",
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: "600",
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  googleBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  fbBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  googleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  gLetter: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#EA4335",
  },
  fbCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#1877F2",
    justifyContent: "center",
    alignItems: "center",
  },
  fLetter: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  socialLabel: {
    color: "#aaa",
    fontSize: 13,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: "#ff1744",
    fontSize: 14,
    fontWeight: "700",
  },
  carBadges: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 24,
    marginBottom: 40,
  },
  badge: {
    fontSize: 28,
    opacity: 0.6,
  },
});
