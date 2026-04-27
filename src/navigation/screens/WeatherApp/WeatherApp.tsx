import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ImageBackground,
  StatusBar,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const ThunderBolt = ({
  left,
  top,
  delay,
  size,
}: {
  left: number;
  top: number;
  delay: number;
  size: number;
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const flash = () => {
      Animated.sequence([
        Animated.delay(delay + Math.random() * 4000),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 60,
          useNativeDriver: true,
        }),
        Animated.delay(100),
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => flash());
    };
    flash();
  }, []);

  return (
    <Animated.Text
      style={[
        {
          position: "absolute",
          left,
          top,
          opacity,
          fontSize: size,
          color: "#FF4444",
          textShadowColor: "#FF0000",
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 20,
          zIndex: 5,
        },
      ]}
    >
      ⚡
    </Animated.Text>
  );
};

const ScreenFlash = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const flash = () => {
      Animated.sequence([
        Animated.delay(3000 + Math.random() * 5000),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.delay(80),
        Animated.timing(opacity, {
          toValue: 0.15,
          duration: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => flash());
    };
    flash();
  }, []);

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#FF2222",
        opacity,
        zIndex: 4,
      }}
      pointerEvents="none"
    />
  );
};

const RainDrop = ({
  left,
  delay,
  duration,
}: {
  left: number;
  delay: number;
  duration: number;
}) => {
  const translateY = useRef(new Animated.Value(-20)).current;
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const fall = () => {
      translateY.setValue(-20);
      opacity.setValue(0.4);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: height + 20,
          duration,
          delay,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(opacity, {
            toValue: 0,
            duration: duration * 0.8,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => fall());
    };
    fall();
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        left,
        top: 0,
        width: 1.5,
        height: 18,
        backgroundColor: "rgba(255,100,100,0.3)",
        borderRadius: 1,
        opacity,
        transform: [{ translateY }, { rotate: "10deg" }],
        zIndex: 3,
      }}
    />
  );
};

export const WeatherApp = () => {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.root}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80",
        }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
        <View style={styles.darkOverlay} />
      </ImageBackground>

      <ScreenFlash />

      {Array.from({ length: 25 }).map((_, i) => (
        <RainDrop
          key={`rain-${i}`}
          left={Math.random() * width}
          delay={Math.random() * 2000}
          duration={1200 + Math.random() * 800}
        />
      ))}

      <ThunderBolt left={width * 0.1} top={60} delay={1000} size={50} />
      <ThunderBolt left={width * 0.7} top={30} delay={3500} size={60} />
      <ThunderBolt left={width * 0.4} top={90} delay={6000} size={40} />
      <ThunderBolt left={width * 0.85} top={140} delay={2000} size={35} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.content,
            { opacity: fadeIn, transform: [{ translateY: slideUp }] },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.weatherIcon}>🌩️</Text>
            <Text style={styles.title}>StormCast</Text>
            <Text style={styles.subtitle}>Weather Intelligence</Text>
          </View>

          <View style={styles.tempRow}>
            <Text style={styles.tempText}>17°</Text>
            <View style={styles.tempInfo}>
              <Text style={styles.conditionText}>Thunderstorm</Text>
              <Text style={styles.locationText}>📍 New York, NY</Text>
            </View>
          </View>

          <View style={styles.weatherStrip}>
            <View style={styles.weatherStripItem}>
              <Text style={styles.stripIcon}>💨</Text>
              <Text style={styles.stripValue}>24 km/h</Text>
              <Text style={styles.stripLabel}>Wind</Text>
            </View>
            <View style={styles.stripDivider} />
            <View style={styles.weatherStripItem}>
              <Text style={styles.stripIcon}>💧</Text>
              <Text style={styles.stripValue}>89%</Text>
              <Text style={styles.stripLabel}>Humidity</Text>
            </View>
            <View style={styles.stripDivider} />
            <View style={styles.weatherStripItem}>
              <Text style={styles.stripIcon}>🌡️</Text>
              <Text style={styles.stripValue}>12°</Text>
              <Text style={styles.stripLabel}>Feels</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Create Account</Text>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="rgba(255,255,255,0.35)"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,0.35)"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.35)"
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.checkboxRow} activeOpacity={0.7}>
              <View style={styles.checkbox}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
              <Text style={styles.consentText}>
                I agree to the Terms & Privacy Policy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signupButton} activeOpacity={0.8}>
              <LinearGradient
                colors={["#FF1744", "#D50000"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.signupGradient}
              >
                <Text style={styles.signupText}>Sign Up</Text>
                <Text style={styles.signupArrow}>→</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity
                style={styles.socialButton}
                activeOpacity={0.7}
              >
                <ImageBackground
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png",
                  }}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                activeOpacity={0.7}
              >
                <Text style={styles.appleIcon}></Text>
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.footer}>
            Already have an account?{" "}
            <Text style={styles.footerLink}>Log In</Text>
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  weatherIcon: {
    fontSize: 44,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 4,
    textTransform: "uppercase",
    marginTop: 2,
  },
  tempRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    gap: 12,
  },
  tempText: {
    fontSize: 64,
    fontWeight: "200",
    color: "#FF1744",
    textShadowColor: "rgba(255,23,68,0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  tempInfo: {
    gap: 2,
  },
  conditionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  locationText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
  },
  weatherStrip: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: "rgba(255,23,68,0.15)",
  },
  weatherStripItem: {
    alignItems: "center",
    flex: 1,
  },
  stripIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  stripValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  stripLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    marginTop: 2,
  },
  stripDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,23,68,0.12)",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    marginBottom: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#FFFFFF",
    fontSize: 15,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 18,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FF1744",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkmark: {
    fontSize: 12,
    color: "#FF1744",
    fontWeight: "700",
  },
  consentText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    flex: 1,
  },
  signupButton: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 20,
  },
  signupGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    gap: 8,
  },
  signupText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  signupArrow: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  dividerText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    marginHorizontal: 12,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    paddingVertical: 13,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  appleIcon: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  socialText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  footer: {
    textAlign: "center",
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    marginTop: 20,
  },
  footerLink: {
    color: "#FF1744",
    fontWeight: "700",
  },
});

export default WeatherApp;
