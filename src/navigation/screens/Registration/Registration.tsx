import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const carImage = require('../CarRegister/assets/car.png');

export function RegistrationScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  const handleRegister = () => {
    // Handle registration logic here
    console.log('Register pressed');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#0a0e1a', '#1a1f2e', '#0f1419']}
        style={styles.gradient}
      >
        {/* Road lines background effect */}
        <View style={styles.roadLinesContainer}>
          <View style={styles.roadLine} />
          <View style={[styles.roadLine, { top: 200 }]} />
          <View style={[styles.roadLine, { top: 400 }]} />
          <View style={[styles.roadLine, { top: 600 }]} />
        </View>

        {/* Speedometer/dashboard circle decoration */}
        <View style={styles.speedometerCircle} />
        <View style={styles.speedometerCircleInner} />

        {/* Car images as background decorative elements */}
        <Image
          source={carImage}
          style={styles.carBackground1}
          resizeMode="contain"
        />
        <Image
          source={carImage}
          style={styles.carBackground2}
          resizeMode="contain"
        />
        <Image
          source={carImage}
          style={styles.carBackground3}
          resizeMode="contain"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerIconContainer}>
                <Image
                  source={carImage}
                  style={styles.headerCarIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join the ride</Text>
            </View>

            {/* Card Container */}
            <View style={styles.card}>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#6B7280"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#6B7280"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor="#6B7280"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.consentContainer}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    consentChecked && styles.checkboxChecked
                  ]}
                  onPress={() => setConsentChecked(!consentChecked)}
                  activeOpacity={0.7}
                >
                  {consentChecked && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
                <Text style={styles.consentText}>
                  I agree to the <Text style={styles.consentLink}>Terms and Conditions</Text>
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.registerButton,
                  (!consentChecked || !fullName || !email || !password) && styles.registerButtonDisabled
                ]}
                onPress={handleRegister}
                disabled={!consentChecked || !fullName || !email || !password}
              >
                <LinearGradient
                  colors={consentChecked && fullName && email && password 
                    ? ['#FF6B35', '#FF8C5A'] 
                    : ['#374151', '#4B5563']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.registerButtonText}>SIGN UP</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginPromptText}>Already have an account? </Text>
                <TouchableOpacity>
                  <Text style={styles.loginLinkText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
  roadLinesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.15,
  },
  roadLine: {
    position: 'absolute',
    left: '50%',
    width: 2,
    height: 80,
    backgroundColor: '#FF6B35',
    marginLeft: -1,
    borderRadius: 1,
  },
  speedometerCircle: {
    position: 'absolute',
    top: -150,
    right: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 53, 0.1)',
    borderStyle: 'dashed',
  },
  speedometerCircleInner: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.08)',
    borderStyle: 'dashed',
  },
  carBackground1: {
    position: 'absolute',
    top: 100,
    left: -80,
    width: 200,
    height: 120,
    opacity: 0.12,
    transform: [{ rotate: '-15deg' }],
  },
  carBackground2: {
    position: 'absolute',
    bottom: 150,
    right: -60,
    width: 180,
    height: 110,
    opacity: 0.1,
    transform: [{ rotate: '25deg' }],
  },
  carBackground3: {
    position: 'absolute',
    top: 300,
    right: 20,
    width: 150,
    height: 90,
    opacity: 0.08,
    transform: [{ rotate: '10deg' }],
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  content: {
    paddingHorizontal: 24,
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerIconContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.2)',
  },
  headerCarIcon: {
    width: 40,
    height: 24,
    tintColor: '#FF6B35',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'rgba(30, 35, 50, 0.85)',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
  },
  inputWrapper: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  consentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
    paddingHorizontal: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4B5563',
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#FF6B35',
    backgroundColor: '#FF6B35',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  consentText: {
    fontSize: 14,
    color: '#D1D5DB',
    flex: 1,
    lineHeight: 20,
  },
  consentLink: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  registerButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1.2,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPromptText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  loginLinkText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '700',
  },
});

