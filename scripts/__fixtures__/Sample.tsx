import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const ITEMS = [
  { id: "1", title: "One" },
  { id: "2", title: "Two" },
  { id: "3", title: "Three" },
];

const TABS = ["Home", "Search"] as const;

const FIRST = ["a", "b"];

export default function Sample() {
  const [tab, setTab] = useState(FIRST[0]);
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Hello</Text>
      <Text style={styles.value}>
        5.2 <Text style={styles.unit}>MI</Text>
      </Text>
      {open ? <Text>Open</Text> : <Text>Closed</Text>}
      {open && (
        <View style={styles.card}>
          <Text>Card</Text>
        </View>
      )}
      <View style={{ padding: 8, gap: 4 }}>
        {ITEMS.map((item) => (
          <Text key={item.id} style={styles.row}>
            {item.title}
          </Text>
        ))}
      </View>
      <FlatList
        data={ITEMS}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
      <View style={styles.tabs}>
        {TABS.map((t) => (
          <Text key={t}>{t}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: { color: "#fff", fontSize: 20 },
  value: {
    fontSize: 24,
  },
  unit: {
    fontSize: 12,
  },
  card: {
    padding: 10,
  },
  row: {
    color: "#fff",
  },
  tabs: {
    flexDirection: "row",
  },
});
