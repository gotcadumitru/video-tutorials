import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

type Turn =
  | { id: string; from: "user"; text: string }
  | { id: string; from: "ai"; text: string; code?: { lang: string; body: string } };

const TURNS: Turn[] = [
  {
    id: "1",
    from: "user",
    text: "Why does my React Native FlatList stutter when I scroll fast through 200 items with images?",
  },
  {
    id: "2",
    from: "ai",
    text:
      "Most stutter on a 200-item FlatList comes from three things stacking up:\n\n1.  Each row re-rendering on every scroll tick\n2.  Synchronous image decoding on the JS thread\n3.  Anonymous functions in render breaking memoization\n\nThe single biggest win is pulling row components out and wrapping them in `React.memo`, then giving them a stable key.",
  },
  {
    id: "3",
    from: "ai",
    text: "Here's the pattern I'd use:",
    code: {
      lang: "tsx",
      body:
        "const Row = React.memo(({ item }: { item: Item }) => (\n  <View style={styles.row}>\n    <Image\n      source={{ uri: item.thumb }}\n      style={styles.thumb}\n    />\n    <Text>{item.title}</Text>\n  </View>\n));\n\n<FlatList\n  data={items}\n  keyExtractor={(i) => i.id}\n  renderItem={({ item }) => <Row item={item} />}\n  removeClippedSubviews\n  initialNumToRender={10}\n  windowSize={5}\n/>",
    },
  },
  {
    id: "4",
    from: "ai",
    text:
      "If your images are remote, swap `Image` for `expo-image` — it caches decoded bitmaps and is dramatically faster on long lists. Want me to show the FlashList version next?",
  },
];

function CodeBlock({ lang, body }: { lang: string; body: string }) {
  return (
    <View style={styles.codeBlock}>
      <View style={styles.codeHeader}>
        <Text style={styles.codeLang}>{lang}</Text>
        <TouchableOpacity style={styles.copyBtn}>
          <Feather name="copy" size={12} color="#a1a1a1" />
          <Text style={styles.copyTxt}>Copy</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text style={styles.codeBody}>{body}</Text>
      </ScrollView>
    </View>
  );
}

function Turn({ t }: { t: Turn }) {
  if (t.from === "user") {
    return (
      <View style={styles.userTurnRow}>
        <View style={styles.userBubble}>
          <Text style={styles.userTxt}>{t.text}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.aiTurn}>
      <View style={styles.aiAvatar}>
        <View style={styles.aiInner} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.aiTxt}>{t.text}</Text>
        {t.code && <CodeBlock lang={t.code.lang} body={t.code.body} />}
        <View style={styles.aiActions}>
          <Feather name="copy" size={15} color="#9b9b9b" />
          <Feather name="thumbs-up" size={15} color="#9b9b9b" />
          <Feather name="thumbs-down" size={15} color="#9b9b9b" />
          <Ionicons name="volume-medium-outline" size={17} color="#9b9b9b" />
          <Feather name="refresh-cw" size={15} color="#9b9b9b" />
          <Feather name="share" size={15} color="#9b9b9b" />
        </View>
      </View>
    </View>
  );
}

export default function ChatGPT() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={26} color="#ececec" />
        </TouchableOpacity>
        <View style={styles.modelPill}>
          <Text style={styles.modelTxt}>ChatGPT</Text>
          <Text style={styles.modelSub}>4o</Text>
          <Ionicons name="chevron-down" size={14} color="#9b9b9b" />
        </View>
        <TouchableOpacity>
          <Feather name="edit" size={20} color="#ececec" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {TURNS.map((t) => (
          <Turn key={t.id} t={t} />
        ))}
      </ScrollView>

      <View style={styles.composer}>
        <View style={styles.composerInner}>
          <TouchableOpacity style={styles.composerIcon}>
            <Ionicons name="add" size={22} color="#ececec" />
          </TouchableOpacity>
          <TextInput
            placeholder="Ask anything"
            placeholderTextColor="#7f7f7f"
            style={styles.input}
            multiline
          />
          <View style={styles.composerRight}>
            <MaterialCommunityIcons name="tune-variant" size={20} color="#ececec" />
            <View style={styles.micBtn}>
              <Ionicons name="mic" size={20} color="#000" />
            </View>
          </View>
        </View>
        <View style={styles.suggestRow}>
          {[
            { icon: "image-outline", label: "Image", lib: "ion" },
            { icon: "code-tags", label: "Code", lib: "mci" },
            { icon: "school-outline", label: "Tutor me", lib: "ion" },
            { icon: "lightbulb-outline", label: "Ideas", lib: "mci" },
          ].map((s) => (
            <TouchableOpacity key={s.label} style={styles.suggestPill}>
              {s.lib === "mci" ? (
                <MaterialCommunityIcons name={s.icon as any} size={14} color="#ececec" />
              ) : (
                <Ionicons name={s.icon as any} size={14} color="#ececec" />
              )}
              <Text style={styles.suggestTxt}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#212121" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingTop: 56,
    paddingBottom: 8,
  },
  modelPill: { flexDirection: "row", alignItems: "center", gap: 6 },
  modelTxt: { color: "#ececec", fontSize: 18, fontWeight: "700" },
  modelSub: { color: "#9b9b9b", fontSize: 18, fontWeight: "500" },
  userTurnRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 14,
    marginTop: 16,
  },
  userBubble: {
    backgroundColor: "#2f2f2f",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: "82%",
  },
  userTxt: { color: "#ececec", fontSize: 15, lineHeight: 22 },
  aiTurn: {
    flexDirection: "row",
    paddingHorizontal: 14,
    marginTop: 22,
    gap: 12,
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#3f3f3f",
    backgroundColor: "#212121",
    alignItems: "center",
    justifyContent: "center",
  },
  aiInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#ececec",
    transform: [{ rotate: "45deg" }],
  },
  aiTxt: { color: "#ececec", fontSize: 15, lineHeight: 24 },
  aiActions: {
    flexDirection: "row",
    gap: 18,
    marginTop: 12,
    alignItems: "center",
  },
  codeBlock: {
    backgroundColor: "#0d0d0d",
    borderRadius: 8,
    marginTop: 12,
    overflow: "hidden",
  },
  codeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#2f2f2f",
  },
  codeLang: { color: "#a1a1a1", fontSize: 11, fontWeight: "600" },
  copyBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  copyTxt: { color: "#a1a1a1", fontSize: 11, fontWeight: "600" },
  codeBody: {
    color: "#e6e6e6",
    fontSize: 13,
    fontFamily: "Courier",
    lineHeight: 20,
    padding: 12,
  },
  composer: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    paddingTop: 6,
    backgroundColor: "#212121",
    borderTopWidth: 0.5,
    borderTopColor: "#2f2f2f",
  },
  composerInner: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#2f2f2f",
    borderRadius: 28,
    paddingHorizontal: 6,
    paddingVertical: 6,
    gap: 4,
    minHeight: 50,
  },
  composerIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    color: "#ececec",
    fontSize: 16,
    paddingHorizontal: 4,
    paddingTop: 10,
    paddingBottom: 10,
    maxHeight: 140,
  },
  composerRight: { flexDirection: "row", alignItems: "center", gap: 8, paddingRight: 4, paddingBottom: 4 },
  micBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  suggestRow: { flexDirection: "row", gap: 8, marginTop: 10 },
  suggestPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#3f3f3f",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  suggestTxt: { color: "#ececec", fontSize: 12, fontWeight: "500" },
});
