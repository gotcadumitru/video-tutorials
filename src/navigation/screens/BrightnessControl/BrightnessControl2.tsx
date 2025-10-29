import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import {
  Gesture,
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const backgroundImage = require("./background.png");

const BrightnessControl2 = () => {
  const NUM_SLIDERS = 16;
  const [brightnessValues, setBrightnessValues] = useState(
    Array(NUM_SLIDERS).fill(0.3)
  );
  const [sliderPositions] = useState(
    Array(NUM_SLIDERS)
      .fill(null)
      .map(() => new Animated.Value(0.3 * 120))
  );
  const initialPositionRefs = React.useRef(Array(NUM_SLIDERS).fill(0.3 * 120));

  const handleSliderGesture = (index: number) => (event: any) => {
    const { translationY } = event.nativeEvent;
    // Calculate absolute position: initial position + translation
    const absoluteY = initialPositionRefs.current[index] + translationY;
    // Clamp to valid range (0 to 120)
    const clampedY = Math.max(0, Math.min(120, absoluteY));
    // Calculate brightness based on slider position (inverted - top is bright, bottom is dark)
    const newBrightness = Math.max(0.1, Math.min(1, 1 - clampedY / 120));

    const newBrightnessValues = [...brightnessValues];
    newBrightnessValues[index] = newBrightness;
    setBrightnessValues(newBrightnessValues);

    // Update animated value
    sliderPositions[index].setValue(clampedY);
  };

  const handleSliderStateChange =
    (index: number) =>
    ({ nativeEvent }: any) => {
      if (nativeEvent.state === 2) {
        // GESTURE_STATE_ACTIVE - gesture started
        // Update initial position when gesture starts
        const currentPosition = ((sliderPositions[index] as any)._value ??
          (1 - brightnessValues[index]) * 120) as number;
        initialPositionRefs.current[index] = currentPosition;
      } else if (nativeEvent.state === 5) {
        // GESTURE_STATE_END
        // Snap to final position based on current brightness
        const finalY = (1 - brightnessValues[index]) * 120;
        const clampedY = Math.max(0, Math.min(120, finalY));

        // Update the ref to the new position
        initialPositionRefs.current[index] = clampedY;

        Animated.spring(sliderPositions[index], {
          toValue: clampedY,
          useNativeDriver: false,
        }).start(() => {
          // Update ref after animation completes
          initialPositionRefs.current[index] = clampedY;
        });
      }
    };

  // Calculate average brightness for overlay
  const averageBrightness =
    brightnessValues.reduce((a, b) => a + b, 0) / brightnessValues.length;

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1 }}>
      <StatusBar hidden />
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {/* Background Image as separate layer */}
        {/* <ImageBackground style={{brightness: averageBrightness}}>

        </ImageBackground> */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            filter: `brightness(${averageBrightness * 20})`,
          }}
        >
          <Image
            source={backgroundImage}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          />
        </View>
        {/* Content layer */}
        <SafeAreaView
          style={{ flex: 1, paddingTop: 50, position: "relative", zIndex: 2 }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 25,
              padding: 20,
            }}
          >
            {/* Render 16 Slider Tracks */}
            {Array.from({ length: NUM_SLIDERS }).map((_, index) => (
              <View
                key={index}
                style={{
                  width: 55,
                  height: 120,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderWidth: 0.7,
                  borderColor: "rgba(255,255,255,0.5)",
                  borderRadius: 30,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <PanGestureHandler
                  onGestureEvent={handleSliderGesture(index)}
                  onHandlerStateChange={handleSliderStateChange(index)}
                >
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: "white",
                      borderRadius: 0,
                      height: `${brightnessValues[index] * 100}%`,
                    }}
                  />
                </PanGestureHandler>
                <Icon
                  name="sunny"
                  size={25}
                  pointerEvents="none"
                  color="#fad511"
                  style={{ position: "absolute", bottom: 15, left: 15 }}
                />
              </View>
            ))}
          </View>
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
};

export default BrightnessControl2;
