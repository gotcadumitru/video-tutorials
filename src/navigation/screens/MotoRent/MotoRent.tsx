import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";


export default function MotoRent() {
  const [consent, setConsent] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2670&auto=format&fit=crop",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      ></ImageBackground>
      <LinearGradient
        colors={["transparent", "#1a1816", "#1a1816"]}
        locations={[0, 0.5, 1]}
        style={styles.gradientOverlay}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>RENTER PASS</Text>
            </View>
            <Text style={styles.title}>
              RIDE<Text style={styles.titleAccent}>WILD</Text>
            </Text>
            <Text style={styles.subtitle}>TWO WHEELS. ONE SOUL.</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>RIDER FULL NAME</Text>
              <TextInput
                style={styles.input}
                placeholder="E.g. Maverick Mitchell"
                placeholderTextColor="#5a5550"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="rider@example.com"
                placeholderTextColor="#5a5550"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>SECURE CODE</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#5a5550"
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setConsent(!consent)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, consent && styles.checkboxActive]}>
                {consent && <View style={styles.checkInner} />}
              </View>
              <Text style={styles.checkboxLabel}>
                I agree to the <Text style={styles.link}>Rental Agreement</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>CONFIRM BOOKING</Text>
            </TouchableOpacity>

            <View style={styles.orSection}>
              <View style={styles.line} />
              <Text style={styles.orText}>QUICK ACCESS</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <Text style={styles.socialBtnText}>GOOGLE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Text style={styles.socialBtnText}>APPLE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

