import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const spotifyLogo = require('./shopify.png');
const topImages = require('./top_images.png');
const googleIcon = require('./google.png');
const facebookIcon = require('./facebook.png');
const appleIcon = require('./apple.png');

export function SpotifySignup() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden backgroundColor="#000000" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Image source={topImages} style={styles.topBackground} />

        <View style={styles.logohider} />
        <View style={styles.gradientOverlay} />

        <View style={styles.contentSection}>
          <View style={styles.logoContainer}>
            <Image source={spotifyLogo} style={styles.spotifyLogo} />
          </View>

          <Text style={styles.mainTitle}>Millions of Songs.</Text>
          <Text style={styles.mainTitle}>Free on Spotify.</Text>

          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign up free</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image source={googleIcon} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image source={facebookIcon} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image source={appleIcon} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginLink}>
            <Text style={styles.loginLinkText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flexGrow: 1,
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 450,
    opacity: 1,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  logohider: {
    position: 'absolute',
    top: 395,
    left: 180,
    right: 0,
    height: 50,
    width: 50,
    backgroundColor: '#121212',
  },
  contentSection: {
    flex: 1,
    paddingTop: 370,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 16,
  },
  spotifyLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 38,
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#1ED760',
    borderRadius: 25,
    paddingVertical: 12,
    marginTop: 32,
    marginBottom: 12,
    alignItems: 'center',
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  socialButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#5E5E5E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
  loginLink: {
    marginTop: 20,
    paddingVertical: 12,
  },
  loginLinkText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
