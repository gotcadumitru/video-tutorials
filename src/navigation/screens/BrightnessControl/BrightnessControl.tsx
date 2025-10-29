import { StaticScreenProps } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  PanResponder,
  Animated,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = StaticScreenProps<{}>;

// Constants
const SLIDER_WIDTH = 60;
const SLIDER_HEIGHT = 130;
const SUN_ICON_SIZE = 40;
const SLIDER_BORDER_RADIUS = 40;
const NUM_SLIDERS = 20;
const MIN_BRIGHTNESS = 0.3;
const MAX_BRIGHTNESS = 0.7;
const GRADIENT_OVERLAY_HEIGHT = 20;
const MIN_GESTURE_THRESHOLD = 5;

// Colors
const COLORS = {
  dark: '#4a3d38',
  white: '#ffffff',
  background: '#000000',
  gradientOverlay: 'rgba(0,0,0,0.3)',
} as const;

// Animation config
const SUN_ANIMATION_CONFIG = {
  tension: 100,
  friction: 8,
} as const;

interface BrightnessSliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

interface GestureEvent {
  nativeEvent: {
    pageY: number;
  };
}

interface GestureState {
  dy: number;
  dx: number;
}

interface PressEvent {
  nativeEvent: {
    locationY: number;
  };
}

function BrightnessSlider({ value, onValueChange }: BrightnessSliderProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startValue = useRef(0);
  const containerRef = useRef<View>(null);
  
  // Initialize animated value for sun position
  const getInitialSunPosition = (brightness: number) => {
    const darkHeight = (1 - brightness) * SLIDER_HEIGHT;
    return darkHeight - SUN_ICON_SIZE / 2;
  };
  
  const sunPositionAnim = useRef(
    new Animated.Value(getInitialSunPosition(value))
  ).current;

  // Calculate section heights
  const whiteHeight = currentValue * SLIDER_HEIGHT;
  const darkHeight = SLIDER_HEIGHT - whiteHeight;
  
  // Update sun position anim when value changes (but not during active drag)
  useEffect(() => {
    if (!isDragging) {
      const targetPosition = darkHeight - SUN_ICON_SIZE / 2;
      Animated.spring(sunPositionAnim, {
        toValue: targetPosition,
        useNativeDriver: false,
        ...SUN_ANIMATION_CONFIG,
      }).start();
    }
  }, [darkHeight, isDragging, sunPositionAnim]);

  // Sync currentValue with prop value
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  // Helper function to clamp value between 0 and 1
  const clampBrightness = (val: number): number => Math.max(0, Math.min(1, val));

  // Helper function to calculate brightness from delta
  const calculateBrightnessFromDelta = (deltaY: number, start: number): number => {
    const deltaRatio = -deltaY / SLIDER_HEIGHT;
    return clampBrightness(start + deltaRatio);
  };

  // Helper function to update sun position
  const updateSunPosition = (brightness: number) => {
    const darkHeight = (1 - brightness) * SLIDER_HEIGHT;
    const sunPosition = darkHeight - SUN_ICON_SIZE / 2;
    sunPositionAnim.setValue(sunPosition);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState: GestureState) => {
        const isVerticalMovement = Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
        const exceedsThreshold = Math.abs(gestureState.dy) > MIN_GESTURE_THRESHOLD;
        return isVerticalMovement && exceedsThreshold;
      },
      onPanResponderGrant: (evt: GestureEvent) => {
        setIsDragging(true);
        startY.current = evt.nativeEvent.pageY;
        startValue.current = currentValue;
      },
      onPanResponderMove: (_, gestureState: GestureState) => {
        const newValue = calculateBrightnessFromDelta(
          gestureState.dy,
          startValue.current
        );
        setCurrentValue(newValue);
        onValueChange(newValue);
        updateSunPosition(newValue);
      },
      onPanResponderRelease: () => {
        setIsDragging(false);
      },
      onPanResponderTerminationRequest: () => false,
    })
  ).current;

  const handlePress = (evt: PressEvent) => {
    const { locationY } = evt.nativeEvent;
    // Are you gay?
    const brightnessRatio = 1 - locationY / SLIDER_HEIGHT;
    const newValue = clampBrightness(brightnessRatio);
    setCurrentValue(newValue);
    onValueChange(newValue);
  };

  const sunIconLeftPosition = (SLIDER_WIDTH - SUN_ICON_SIZE) / 2;

  return (
    <View style={styles.sliderWrapper}>
      <View
        ref={containerRef}
        style={styles.sliderContainer}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={handlePress}
          style={styles.sliderTrack}
          disabled={isDragging}
        >
          <View style={[styles.darkSection, { height: darkHeight }]} />
          <View style={[styles.whiteSection, { height: whiteHeight }]}>
            <LinearGradient
              colors={[COLORS.gradientOverlay, 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradientOverlay}
            />
          </View>
        </TouchableOpacity>
        
        <Animated.View
          style={[
            styles.sunIconContainer,
            { left: sunIconLeftPosition, top: sunPositionAnim },
          ]}
        >
          <View style={styles.sunIconWrapper}>
            <Text style={styles.sunIcon}>☀️</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

// Helper function to generate random brightness levels
const generateRandomBrightnessLevels = (count: number): number[] => {
  return Array(count)
    .fill(0)
    .map(() => Math.random() * (MAX_BRIGHTNESS - MIN_BRIGHTNESS) + MIN_BRIGHTNESS);
};

export function BrightnessControl({}: Props) {
  const [brightnessLevels, setBrightnessLevels] = useState<number[]>(
    generateRandomBrightnessLevels(NUM_SLIDERS)
  );

  const updateBrightness = (index: number, value: number) => {
    setBrightnessLevels((prevLevels) => {
      const newLevels = [...prevLevels];
      newLevels[index] = value;
      return newLevels;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
      >
        <View style={styles.slidersGrid}>
          {/* WTF are you doing? */}
          {brightnessLevels.map((level, index) => (
            <BrightnessSlider
              key={index}
              value={level}
              onValueChange={(value) => updateBrightness(index, value)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
// I love you
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  slidersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  sliderWrapper: {
    margin: 0,
  },
  sliderContainer: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    position: 'relative',
  },
  sliderTrack: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    borderRadius: SLIDER_BORDER_RADIUS,
    overflow: 'hidden',
    backgroundColor: COLORS.dark,
  },
  darkSection: {
    width: '100%',
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: SLIDER_BORDER_RADIUS,
    borderTopRightRadius: SLIDER_BORDER_RADIUS,
  },
  whiteSection: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: SLIDER_BORDER_RADIUS,
    borderBottomRightRadius: SLIDER_BORDER_RADIUS,
    position: 'relative',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: GRADIENT_OVERLAY_HEIGHT,
  },
  sunIconContainer: {
    position: 'absolute',
    width: SUN_ICON_SIZE,
    height: SUN_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  sunIconWrapper: {
    width: SUN_ICON_SIZE,
    height: SUN_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunIcon: {
    fontSize: 36,
  },
});

