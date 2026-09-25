import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HingeModule, { useHinge } from "../../../../modules/hinge";

const TICKS = Array.from({ length: 13 }, (_, i) => i * 15);

const STATUS_LABEL = {
  unknown: "Waiting…",
  closed: "Closed",
  partiallyOpen: "Half open",
  fullyOpen: "Fully open",
};

export default function HingeProtractor() {
  const { width, height } = useWindowDimensions();
  const hinge = useHinge();
  const needle = useRef(new Animated.Value(0)).current;

  const angle = Math.round(hinge.angle);
  const perfect = hinge.available && Math.abs(hinge.angle - 90) <= 2;
  const radius = Math.max(80, Math.min((width - 48) / 2, 260, height - 500));

  useEffect(() => {
    Animated.spring(needle, {
      toValue: hinge.angle,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  }, [hinge.angle]);

  const rotate = needle.interpolate({
    inputRange: [0, 180],
    outputRange: ["-180deg", "0deg"],
    extrapolate: "clamp",
  });

  const moduleInfo = !HingeModule
    ? "module missing — rebuild the app"
    : !HingeModule.isSupported()
      ? "needs iOS 27.1"
      : hinge.available
        ? "hinge connected"
        : "waiting for hinge updates";

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={perfect ? ["#065f46", "#022c22"] : ["#4c1d95", "#0f0a1e"]}
        style={StyleSheet.absoluteFill}
      />

      <Text style={styles.brand}>Hinge°</Text>
      <Text style={styles.subtitle}>Your iPhone is a protractor</Text>

      <Text style={[styles.angle, perfect && styles.anglePerfect]}>
        {angle}°
      </Text>
      <View style={[styles.pill, perfect && styles.pillPerfect]}>
        <Text style={styles.pillText}>
          {perfect ? "Perfect 90°" : STATUS_LABEL[hinge.status]}
        </Text>
      </View>

      <View style={{
          width: radius * 2,
          height: radius + 20,
          marginTop: 40,
          overflow: "hidden",
        }}>
        <View
          style={[
            styles.arc,
            {
              width: radius * 2,
              height: radius * 2,
              borderRadius: radius,
            },
          ]}
        />

        {TICKS.map((tick) => (
          <View
            key={tick}
            style={[
              styles.tickArm,
              {
                width: radius,
                left: radius,
                top: radius,
                transform: [{ rotate: `${tick - 180}deg` }],
              },
            ]}
          >
            <View
              style={[styles.tick, tick % 45 === 0 && styles.tickMajor]}
            />
          </View>
        ))}

        <Animated.View
          style={[
            styles.needle,
            {
              width: radius - 16,
              left: radius,
              top: radius - 3,
              transform: [{ rotate }],
            },
            perfect && styles.needlePerfect,
          ]}
        />
        <View
          style={[styles.hub, { left: radius - 14, top: radius - 14 }]}
        />
      </View>

      <Text style={styles.debug}>
        {moduleInfo} · {hinge.radians.toFixed(3)} rad · {hinge.status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
  },
  brand: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1,
  },
  subtitle: {
    color: "#c4b5fd",
    fontSize: 16,
    marginTop: 4,
  },
  angle: {
    color: "#fff",
    fontSize: 120,
    fontWeight: "900",
    fontVariant: ["tabular-nums"],
    marginTop: 32,
  },
  anglePerfect: {
    color: "#6ee7b7",
  },
  pill: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
  },
  pillPerfect: {
    backgroundColor: "#10b981",
  },
  pillText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  arc: {
    position: "absolute",
    borderWidth: 6,
    borderColor: "rgba(255,255,255,0.25)",
  },
  tickArm: {
    position: "absolute",
    height: 0,
    transformOrigin: "left center",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  tick: {
    width: 14,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginRight: 10,
  },
  tickMajor: {
    width: 26,
    height: 5,
    backgroundColor: "#fff",
  },
  needle: {
    position: "absolute",
    height: 6,
    borderRadius: 3,
    backgroundColor: "#f472b6",
    transformOrigin: "left center",
  },
  needlePerfect: {
    backgroundColor: "#6ee7b7",
  },
  hub: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
  },
  debug: {
    marginTop: 16,
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
  },
});
