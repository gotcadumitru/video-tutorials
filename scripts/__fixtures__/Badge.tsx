import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Badge = () => (
  <View style={styles.badge}>
    <Text style={styles.label}>New</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    padding: 4,
  },
  label: {
    color: "#fff",
  },
});
