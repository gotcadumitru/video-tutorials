import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

export default function RaceRegistrationScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1920&auto=format&fit=crop' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.85)', '#000000']}
          style={styles.gradient}
        >
          <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
              style={styles.keyboardView}
            >
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.headerContainer}>
                  <Text style={styles.brandTitle}>APEX<Text style={styles.brandAccent}>RACE</Text></Text>
                  <Text style={styles.subtitle}>START YOUR ENGINE</Text>
                </View>

                <View style={styles.formContainer}>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>FULL NAME</Text>
                    <TextInput 
                      style={styles.input} 
                      placeholder="Driver Name" 
                      placeholderTextColor="#666" 
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>EMAIL</Text>
                    <TextInput 
                      style={styles.input} 
                      placeholder="name@example.com" 
                      placeholderTextColor="#666" 
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>PASSWORD</Text>
                    <TextInput 
                      style={styles.input} 
                      placeholder="••••••••" 
                      placeholderTextColor="#666" 
                      secureTextEntry
                    />
                  </View>

                  <View style={styles.consentContainer}>
                    <Pressable style={styles.checkboxBase}>
                      <View style={styles.checkboxInner} />
                    </Pressable>
                    <Text style={styles.consentText}>
                      I agree to the <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
                    </Text>
                  </View>

                  <Pressable style={styles.primaryButton}>
                    <LinearGradient
                      colors={['#D32F2F', '#B71C1C']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.gradientButton}
                    >
                      <Text style={styles.primaryButtonText}>JOIN RACE</Text>
                    </LinearGradient>
                  </Pressable>

                  <View style={styles.dividerContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>OR PIT STOP WITH</Text>
                    <View style={styles.line} />
                  </View>

                  <View style={styles.socialRow}>
                    <Pressable style={styles.socialButton}>
                      <Image 
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/300/300221.png' }} 
                        style={styles.socialIcon} 
                      />
                      <Text style={styles.socialText}>Google</Text>
                    </Pressable>
                    
                    <Pressable style={styles.socialButton}>
                      <Image 
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png' }} 
                        style={styles.socialIcon} 
                      />
                      <Text style={styles.socialText}>Facebook</Text>
                    </Pressable>
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
