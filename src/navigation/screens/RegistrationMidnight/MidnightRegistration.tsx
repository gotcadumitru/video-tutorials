import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

const carImage = require('../CarRegister/assets/car.png');
const asphaltTexture = require('../CarRegister/assets/screen_background.jpg');
const tireTrack = require('../Login_1/assets/type_track.png');

export function MidnightRegistration() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);

  const isComplete = fullName && email && password && consent;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <LinearGradient
        colors={['#05070B', '#0B0F18', '#05070B']}
        style={styles.gradient}
      >
        <View style={styles.backgroundLayer}>
          <Image source={asphaltTexture} style={styles.asphalt} resizeMode="cover" />
          <Image source={tireTrack} style={[styles.tireTrack, styles.tireTrackTop]} resizeMode="contain" />
          <Image source={tireTrack} style={[styles.tireTrack, styles.tireTrackBottom]} resizeMode="contain" />
          <Image source={carImage} style={styles.carGlow} resizeMode="contain" />
          <Image source={carImage} style={styles.carGhost} resizeMode="contain" />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.badge}>
              <Ionicons name="car-sport-outline" size={18} color="#8AFFC1" />
            </View>
            <Text style={styles.kicker}>Midnight Garage</Text>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.subtitle}>
              Minimal, dark, and built for people who live for the night drive.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.inputRow}>
              <View style={styles.iconChip}>
                <Ionicons name="person-outline" size={18} color="#8AFFC1" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Full name"
                placeholderTextColor="#6B7280"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.iconChip}>
                <Ionicons name="mail-outline" size={18} color="#8AFFC1" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.iconChip}>
                <Ionicons name="lock-closed-outline" size={18} color="#8AFFC1" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#6B7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={styles.consentRow}
              onPress={() => setConsent(!consent)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, consent && styles.checkboxChecked]}>
                {consent && <Ionicons name="checkmark" size={14} color="#05070B" />}
              </View>
              <View style={styles.consentTextWrapper}>
                <Text style={styles.consentLabel}>Consent to data</Text>
                <Text style={styles.consentCopy}>
                  Allow night-drive insights and pit-stop reminders.
                </Text>
              </View>
              <Ionicons
                name={consent ? 'flash' : 'flash-outline'}
                size={18}
                color="#8AFFC1"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.primaryButton, !isComplete && styles.primaryButtonDisabled]}
              disabled={!isComplete}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={isComplete ? ['#8AFFC1', '#4BE6A5'] : ['#1F2937', '#111827']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryButtonGradient}
              >
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color={isComplete ? '#05070B' : '#6B7280'}
                />
                <Text
                  style={[
                    styles.primaryButtonText,
                    !isComplete && styles.primaryButtonTextDisabled,
                  ]}
                >
                  Ignite Account
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Already in the crew?</Text>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

