import React, { useState } from "react";
import {
  Host,
  Text as TextUI,
  TextField,
  Button,
  Chart,
  ColorPicker,
} from "@expo/ui/swift-ui";
import { glassEffect, padding } from "@expo/ui/swift-ui/modifiers";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

// Import assets from CarRegister folder
const backgroundImage = require("./assets/screen_background.jpg");
const carImage = require("./assets/car.png");

export function Register() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    // Handle sign up logic here
    console.log("Sign up pressed");
  };

  const handleLogin = () => {
    // Navigate to login screen or handle login
    console.log("Login pressed");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Background Image */}
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay for better text readability */}
        <View style={styles.overlay} />

        {/* Car Image */}
        <View style={styles.carContainer}>
          <Image
            source={carImage}
            style={styles.carImage}
            resizeMode="contain"
          />
        </View>

        {/* Register Title */}
        <Text style={styles.title}>Register</Text>

        {/* Input Fields */}
        <ScrollView style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Host matchContents>
              <TextField
                placeholder="Full Name"
                onChangeText={() => {}}
                modifiers={[
                  padding({
                    all: 16,
                  }),
                  glassEffect({
                    glass: {
                      variant: "regular",
                    },
                    shape: "capsule",
                  }),
                ]}
                // placeholder="Full Name"
                // onChangeText={setPassword}
              />
            </Host>
          </View>

          <View style={styles.inputWrapper}>
            <Host matchContents>
              <TextField
                modifiers={[
                  padding({
                    all: 16,
                  }),
                  glassEffect({
                    glass: {
                      variant: "regular",
                    },
                  }),
                ]}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={setPassword}
              />
            </Host>
          </View>

          <View style={styles.inputWrapper}>
            <Host matchContents>
              <TextField
                modifiers={[
                  padding({
                    all: 16,
                  }),
                  glassEffect({
                    glass: {
                      variant: "regular",
                    },
                  }),
                ]}
                placeholder="Password"
                onChangeText={setPassword}
              />
            </Host>
          </View>
        </ScrollView>
        {/* Sign Up Button */}
        <View>
          <Host matchContents>
            <Button
              modifiers={[
                glassEffect({
                  glass: {
                    variant: "clear",
                  },
                }),
              ]}
              onPress={handleSignUp}
            >
              <TextUI
                modifiers={[
                  padding({
                    all: 16,
                  }),
                  glassEffect({
                    glass: {
                      variant: "clear",
                    },
                  }),
                ]}
              >
                SIGN UP
              </TextUI>
            </Button>
          </Host>
        </View>

        {/* Login Link */}
        <TouchableOpacity style={styles.loginContainer} onPress={handleLogin}>
          <Text style={styles.loginText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  carContainer: {
    alignItems: "center",
    marginTop: 80,
    marginBottom: 20,
  },
  carImage: {
    width: 200,
    height: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "System",
  },
  inputContainer: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  signUpButton: {
    marginHorizontal: 30,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "System",
  },
  loginContainer: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "System",
  },
});
