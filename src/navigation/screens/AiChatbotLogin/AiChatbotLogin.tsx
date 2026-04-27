import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const BotIcon = ({ size = 28, color = "#fff" }: { size?: number; color?: string }) => (
  <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
    <View
      style={{
        width: size * 0.85,
        height: size * 0.65,
        borderRadius: size * 0.18,
        borderWidth: 2,
        borderColor: color,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <View style={{ flexDirection: "row", gap: size * 0.15 }}>
        <View
          style={{
            width: size * 0.15,
            height: size * 0.15,
            borderRadius: size * 0.075,
            backgroundColor: color,
          }}
        />
        <View
          style={{
            width: size * 0.15,
            height: size * 0.15,
            borderRadius: size * 0.075,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
    <View
      style={{
        width: 2,
        height: size * 0.15,
        backgroundColor: color,
        position: "absolute",
        top: -size * 0.12,
      }}
    />
    <View
      style={{
        width: size * 0.12,
        height: size * 0.12,
        borderRadius: size * 0.06,
        backgroundColor: color,
        position: "absolute",
        top: -size * 0.22,
      }}
    />
  </View>
);

const ChatBubble = ({
  style,
  small,
}: {
  style?: object;
  small?: boolean;
}) => (
  <View
    style={[
      {
        backgroundColor: "rgba(220, 38, 38, 0.12)",
        borderRadius: small ? 10 : 14,
        padding: small ? 8 : 12,
        borderWidth: 1,
        borderColor: "rgba(220, 38, 38, 0.15)",
      },
      style,
    ]}
  >
    <View
      style={{
        width: small ? 40 : 60,
        height: 4,
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: 2,
        marginBottom: 5,
      }}
    />
    <View
      style={{
        width: small ? 28 : 45,
        height: 4,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 2,
      }}
    />
  </View>
);

const NodeDot = ({
  x,
  y,
  size = 4,
  opacity = 0.3,
}: {
  x: number;
  y: number;
  size?: number;
  opacity?: number;
}) => (
  <View
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: `rgba(220, 38, 38, ${opacity})`,
    }}
  />
);

const NodeLine = ({
  x1,
  y1,
  x2,
  y2,
  opacity = 0.08,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity?: number;
}) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <View
      style={{
        position: "absolute",
        left: x1,
        top: y1,
        width: length,
        height: 1,
        backgroundColor: `rgba(220, 38, 38, ${opacity})`,
        transform: [{ rotate: `${angle}deg` }],
        transformOrigin: "left center",
      }}
    />
  );
};

const CircuitPattern = () => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    <NodeDot x={width * 0.1} y={height * 0.08} size={6} opacity={0.25} />
    <NodeDot x={width * 0.85} y={height * 0.12} size={5} opacity={0.2} />
    <NodeDot x={width * 0.3} y={height * 0.05} size={4} opacity={0.15} />
    <NodeDot x={width * 0.65} y={height * 0.03} size={3} opacity={0.2} />
    <NodeDot x={width * 0.92} y={height * 0.25} size={5} opacity={0.15} />
    <NodeDot x={width * 0.05} y={height * 0.3} size={4} opacity={0.2} />
    <NodeDot x={width * 0.75} y={height * 0.88} size={5} opacity={0.15} />
    <NodeDot x={width * 0.15} y={height * 0.92} size={4} opacity={0.2} />
    <NodeDot x={width * 0.5} y={height * 0.95} size={6} opacity={0.12} />

    <NodeLine x1={width * 0.1} y1={height * 0.08} x2={width * 0.3} y2={height * 0.05} opacity={0.06} />
    <NodeLine x1={width * 0.3} y1={height * 0.05} x2={width * 0.65} y2={height * 0.03} opacity={0.05} />
    <NodeLine x1={width * 0.65} y1={height * 0.03} x2={width * 0.85} y2={height * 0.12} opacity={0.06} />
    <NodeLine x1={width * 0.85} y1={height * 0.12} x2={width * 0.92} y2={height * 0.25} opacity={0.05} />
    <NodeLine x1={width * 0.05} y1={height * 0.3} x2={width * 0.1} y2={height * 0.08} opacity={0.04} />

    <ChatBubble style={{ position: "absolute", right: 20, top: height * 0.06 }} small />
    <ChatBubble style={{ position: "absolute", left: 15, top: height * 0.14 }} />
    <ChatBubble style={{ position: "absolute", right: 30, bottom: height * 0.08 }} small />
  </View>
);

const GlowOrb = ({
  x,
  y,
  size,
  color,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
}) => (
  <View
    style={{
      position: "absolute",
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
    }}
    pointerEvents="none"
  />
);

const CheckboxIcon = ({ checked }: { checked: boolean }) => (
  <View
    style={{
      width: 22,
      height: 22,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: checked ? "#DC2626" : "rgba(255,255,255,0.3)",
      backgroundColor: checked ? "#DC2626" : "transparent",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {checked && (
      <Text style={{ color: "#fff", fontSize: 13, fontWeight: "700", marginTop: -1 }}>✓</Text>
    )}
  </View>
);

const GoogleIcon = () => (
  <View style={s.socialIconBox}>
    <Text style={{ fontSize: 18, fontWeight: "700" }}>
      <Text style={{ color: "#4285F4" }}>G</Text>
    </Text>
  </View>
);

const AppleIcon = () => (
  <View style={s.socialIconBox}>
    <Text style={{ fontSize: 20, color: "#fff", fontWeight: "700", marginTop: -2 }}>A</Text>
  </View>
);

const EyeIcon = () => (
  <View style={{ padding: 4 }}>
    <View
      style={{
        width: 22,
        height: 14,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: "rgba(255,255,255,0.4)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: 7,
          height: 7,
          borderRadius: 3.5,
          backgroundColor: "rgba(255,255,255,0.4)",
        }}
      />
    </View>
  </View>
);

export default function AiChatbotLogin() {
  const insets = useSafeAreaInsets();
  const [consent, setConsent] = useState(false);

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(10,10,14,0.92)", "rgba(10,10,14,0.80)", "rgba(10,10,14,0.95)"]}
          style={StyleSheet.absoluteFill}
        />
      </ImageBackground>

      <GlowOrb x={width * 0.15} y={height * 0.2} size={200} color="rgba(220,38,38,0.06)" />
      <GlowOrb x={width * 0.85} y={height * 0.7} size={260} color="rgba(220,38,38,0.05)" />
      <GlowOrb x={width * 0.5} y={height * 0.45} size={180} color="rgba(185,28,28,0.04)" />

      <CircuitPattern />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            s.scrollContent,
            { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 30 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={s.header}>
            <View style={s.logoRow}>
              <View style={s.logoBg}>
                <BotIcon size={30} color="#fff" />
              </View>
              <View>
                <Text style={s.brand}>NeuralChat</Text>
                <Text style={s.tagline}>AI-Powered Conversations</Text>
              </View>
            </View>
            <Text style={s.title}>Create your{"\n"}account</Text>
            <Text style={s.subtitle}>
              Join millions using AI to enhance their daily workflow
            </Text>
          </View>

          <View style={s.card}>
            <View style={s.inputGroup}>
              <Text style={s.label}>Full Name</Text>
              <View style={s.inputRow}>
                <Text style={s.inputIcon}>👤</Text>
                <TextInput
                  style={s.input}
                  placeholder="John Doe"
                  placeholderTextColor="rgba(255,255,255,0.25)"
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={s.inputGroup}>
              <Text style={s.label}>Email Address</Text>
              <View style={s.inputRow}>
                <Text style={s.inputIcon}>✉️</Text>
                <TextInput
                  style={s.input}
                  placeholder="you@email.com"
                  placeholderTextColor="rgba(255,255,255,0.25)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={s.inputGroup}>
              <Text style={s.label}>Password</Text>
              <View style={s.inputRow}>
                <Text style={s.inputIcon}>🔒</Text>
                <TextInput
                  style={[s.input, { flex: 1 }]}
                  placeholder="Min 8 characters"
                  placeholderTextColor="rgba(255,255,255,0.25)"
                  secureTextEntry
                />
                <EyeIcon />
              </View>
            </View>

            <TouchableOpacity
              style={s.checkboxRow}
              activeOpacity={0.7}
              onPress={() => setConsent(!consent)}
            >
              <CheckboxIcon checked={consent} />
              <Text style={s.consentText}>
                I agree to the{" "}
                <Text style={s.consentLink}>Terms of Service</Text> and{" "}
                <Text style={s.consentLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85}>
              <LinearGradient
                colors={["#DC2626", "#B91C1C"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={s.signupBtn}
              >
                <BotIcon size={20} color="#fff" />
                <Text style={s.signupBtnText}>Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={s.dividerRow}>
              <View style={s.dividerLine} />
              <Text style={s.dividerText}>or continue with</Text>
              <View style={s.dividerLine} />
            </View>

            <View style={s.socialRow}>
              <TouchableOpacity style={s.socialBtn} activeOpacity={0.7}>
                <GoogleIcon />
                <Text style={s.socialBtnText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.socialBtn} activeOpacity={0.7}>
                <AppleIcon />
                <Text style={s.socialBtnText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0A0A0E",
  },
  scrollContent: {
    paddingHorizontal: 24,
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    marginBottom: 28,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 28,
  },
  logoBg: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(220,38,38,0.15)",
    borderWidth: 1,
    borderColor: "rgba(220,38,38,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  brand: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    fontWeight: "500",
    marginTop: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.45)",
    marginTop: 10,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.55)",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 14,
    height: 52,
    gap: 10,
  },
  inputIcon: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 22,
    marginTop: 4,
  },
  consentText: {
    flex: 1,
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
    lineHeight: 19,
  },
  consentLink: {
    color: "#DC2626",
    fontWeight: "600",
  },
  signupBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    borderRadius: 16,
    gap: 10,
  },
  signupBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  dividerText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    fontWeight: "500",
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    gap: 8,
  },
  socialIconBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  socialBtnText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    marginTop: 28,
    gap: 14,
  },
  footerText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
  },
  footerLink: {
    color: "#DC2626",
    fontWeight: "700",
  },
  footerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(220,38,38,0.08)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  footerBadgeIcon: {
    fontSize: 13,
  },
  footerBadgeText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    fontWeight: "500",
  },
});
