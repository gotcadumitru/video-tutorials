import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const tireTrackPattern = require('./assets/type_track.png');
const logoImage = require('./assets/logo_c.png');

export function LoginScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#1a1f2e', '#1e2332', '#1a1f2e']}
        style={styles.gradient}
      >
        <View style={styles.backgroundContainer}>
          <Image
            source={tireTrackPattern}
            style={styles.tireTrackTopLeft}
            tintColor="#000000"
            resizeMode="contain"
          />
          <Image
            source={tireTrackPattern}
            style={styles.tireTrackBottomRight}
            tintColor="#000000"
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={logoImage} style={styles.logoImage} resizeMode="contain" />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9CA3AF"

              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity style={styles.loginButton} >
            <Text style={styles.loginButtonText}>LOG IN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPasswordContainer} >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpPromptText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signUpLinkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  tireTrackTopLeft: {
    position: 'absolute',
    top: -80,
    left: -80,
    width: 350,
    height: 350,
    opacity: 0.4,
    transform: [{ rotate: '45deg' }],
  },
  tireTrackBottomRight: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 350,
    height: 350,
    opacity: 0.4,
    transform: [{ rotate: '-135deg' }],
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'flex-start',
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  logoImage: {
    width: 500,
    height: 270,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#2d3447',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4a5568',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#FF8C5A', // Lighter orange
    fontWeight: '500',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: 20,
  },
  signUpPromptText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  signUpLinkText: {
    fontSize: 14,
    color: '#FF6B35', // Orange matching REV and button
    fontWeight: '600',
  },
});

