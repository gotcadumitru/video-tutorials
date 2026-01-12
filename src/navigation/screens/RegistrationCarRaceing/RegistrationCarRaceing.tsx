import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";

export default function RegistrationRaceScreen() {
  return (
    <View style={styles.root}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1600&q=80",
        }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
        <View style={StyleSheet.absoluteFillObject}>
          <LinearGradient
            colors={["rgba(0,0,0,0.92)", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.92)"]}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
      </ImageBackground>

      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1518306721680-efb2c9e8b5cb?auto=format&fit=crop&w=1600&q=80",
        }}
        style={styles.bgAccent}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["rgba(230,0,35,0.18)", "rgba(230,0,35,0.02)", "rgba(0,0,0,0)"]}
        style={styles.redGlow}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🏁</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🏎️</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>⚡</Text>
            </View>
          </View>

          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>
            Join the grid. Start clean. Drive fast.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrap}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                placeholder="you@example.com"
                placeholderTextColor="rgba(255,255,255,0.35)"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Full name</Text>
            <View style={styles.inputWrap}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                placeholder="Dumitru Gotca"
                placeholderTextColor="rgba(255,255,255,0.35)"
                autoCapitalize="words"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrap}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="rgba(255,255,255,0.35)"
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>

          <Pressable style={styles.consentRow}>
            <View style={styles.checkbox} />
            <Text style={styles.consentText}>
              I agree to the Terms and Privacy Policy
            </Text>
          </Pressable>

          <Pressable style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Create account</Text>
            <View style={styles.primaryBtnPill}>
              <Text style={styles.primaryBtnPillText}>GO</Text>
            </View>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialRow}>
            <Pressable style={[styles.socialBtn, styles.googleBtn]}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialText}>Google</Text>
            </Pressable>

            <Pressable style={[styles.socialBtn, styles.fbBtn]}>
              <Text style={styles.socialIcon}>f</Text>
              <Text style={styles.socialText}>Facebook</Text>
            </Pressable>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already on the track?</Text>
            <Pressable>
              <Text style={styles.footerLink}> Sign in</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.bottomHint}>
          <View style={styles.speedLine} />
          <Text style={styles.bottomHintText}>Redline ready</Text>
          <View style={styles.speedLine} />
        </View>
      </ScrollView>
    </View>
  );
}

