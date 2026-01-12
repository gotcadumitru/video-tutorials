import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

export function FinanceRegisterScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?q=80&w=2670&auto=format&fit=crop',
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.7)', '#000000']}
          style={styles.gradientOverlay}
        >
          <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardView}
            >
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.header}>
                  <View style={styles.logoContainer}>
                    <Image 
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/10309/10309267.png' }}
                      style={styles.logoIcon} 
                    />
                  </View>
                  <Text style={styles.title}>WealthFlow</Text>
                  <Text style={styles.subtitle}>Start your financial journey today.</Text>
                </View>

                <View style={styles.formContainer}>
                  
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>FULL NAME</Text>
                    <View style={styles.inputWrapper}>
                      <Image 
                        source={{ uri: 'https://img.icons8.com/ios-glyphs/60/ffffff/user--v1.png' }} 
                        style={styles.inputIcon} 
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="John Doe"
                        placeholderTextColor="#666"
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>EMAIL ADDRESS</Text>
                    <View style={styles.inputWrapper}>
                      <Image 
                        source={{ uri: 'https://img.icons8.com/ios-glyphs/60/ffffff/filled-message.png' }} 
                        style={styles.inputIcon} 
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="name@example.com"
                        placeholderTextColor="#666"
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>PASSWORD</Text>
                    <View style={styles.inputWrapper}>
                      <Image 
                        source={{ uri: 'https://img.icons8.com/ios-glyphs/60/ffffff/lock--v1.png' }} 
                        style={styles.inputIcon} 
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor="#666"
                        secureTextEntry
                      />
                    </View>
                  </View>

                  <View style={styles.checkboxContainer}>
                    <TouchableOpacity style={styles.checkbox}>
                      <View style={styles.checkboxInner} />
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>
                      I agree to the <Text style={styles.linkText}>Terms of Service</Text> & Privacy Policy
                    </Text>
                  </View>

                  <TouchableOpacity activeOpacity={0.8} style={styles.buttonShadow}>
                    <LinearGradient
                      colors={['#FFD700', '#FDB931']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.submitButton}
                    >
                      <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <View style={styles.footer}>
                    <Text style={styles.footerText}>Already a member? </Text>
                    <TouchableOpacity>
                      <Text style={styles.linkText}>Sign In</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}