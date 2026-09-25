import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Animated, type ScrollViewInstance } from "react-native";

export type AIStep = {
  text: string;
  delay?: number;
};

type Props = {
  active: boolean;
  steps: AIStep[];
  result: string;
  resultLabel?: string;
  accent?: string;
  resultSize?: number;
  thinkingSize?: number;
  onDone?: () => void;
};

export function AIThinking({
  active,
  steps,
  result,
  resultLabel,
  accent = "#22d3ee",
  resultSize = 56,
  thinkingSize = 14,
  onDone,
}: Props) {
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState(false);
  const pulse = useRef(new Animated.Value(0.3)).current;
  const scrollRef = useRef<ScrollViewInstance>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  // Reset + run steps when becoming active
  useEffect(() => {
    if (!active) {
      setStepIdx(0);
      setDone(false);
      return;
    }
    let cancelled = false;
    let i = 0;
    setStepIdx(0);
    setDone(false);

    const tick = () => {
      if (cancelled) return;
      if (i >= steps.length) {
        setDone(true);
        onDoneRef.current?.();
        return;
      }
      setStepIdx(i);
      const d = steps[i].delay ?? 1480 + Math.random() * 280;
      i++;
      setTimeout(tick, d);
    };
    const t = setTimeout(tick, 80);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [active, steps]);

  // Pulsing dot
  useEffect(() => {
    if (!active || done) return;
    const a = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 550, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.3, duration: 550, useNativeDriver: true }),
      ])
    );
    a.start();
    return () => a.stop();
  }, [active, done, pulse]);

  if (!active) return null;

  if (done) {
    return (
      <View style={styles.resultBox}>
        {resultLabel && (
          <Text style={[styles.resultLabel, { color: accent }]}>
            {resultLabel.toUpperCase()}
          </Text>
        )}
        <Text
          style={[styles.resultValue, { color: "#fff", fontSize: resultSize }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {result}
        </Text>
      </View>
    );
  }

  const visible = steps.slice(0, stepIdx + 1);

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      onContentSizeChange={() =>
        scrollRef.current?.scrollToEnd({ animated: true })
      }
      showsVerticalScrollIndicator={false}
    >
      {visible.map((s, i) => {
        const isCurrent = i === stepIdx;
        return (
          <View key={i} style={styles.line}>
            {isCurrent ? (
              <Animated.View
                style={[styles.dot, { backgroundColor: accent, opacity: pulse }]}
              />
            ) : (
              <View style={styles.dotSpace} />
            )}
            <Text
              style={[
                styles.thinkingText,
                { fontSize: thinkingSize },
                !isCurrent && styles.textDim,
              ]}
              // numberOfLines={2}
            >
              {s.text}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, alignSelf: "stretch" },
  scrollContent: { paddingVertical: 2 },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotSpace: { width: 8, height: 8 },
  thinkingText: {
    color: "#cbd5e1",
    fontFamily: "Courier",
    fontWeight: "600",
    flex: 1,
  },
  textDim: { color: "#6b7280" },
  resultBox: {
    alignItems: "center",
  },
  resultLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 4,
  },
  resultValue: {
    fontWeight: "900",
    letterSpacing: -1,
  },
});
