import { StaticScreenProps } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import {
  View,
  PanResponder,
  Animated,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = StaticScreenProps<{}>;

const SLIDER_WIDTH = 60;
const SLIDER_HEIGHT = 130;
const SUN_ICON_SIZE = 40;

interface BrightnessSliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

function BrightnessSlider({ value, onValueChange }: BrightnessSliderProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startValue = useRef(0);
  const containerRef = useRef<View>(null);
  
  // Animated value for sun position (initialize based on current value)
  const initialDarkHeight = (1 - value) * SLIDER_HEIGHT;
  const sunPositionAnim = useRef(new Animated.Value(initialDarkHeight - SUN_ICON_SIZE / 2)).current;

  // Calculate white section height based on brightness value (0 to 1)
  // Higher value = more white (more bright)
  const whiteHeight = currentValue * SLIDER_HEIGHT;
  const darkHeight = SLIDER_HEIGHT - whiteHeight;
  
  // Update sun position anim when value changes (but not during active drag)
  React.useEffect(() => {
    if (!isDragging) {
      const targetPosition = darkHeight - SUN_ICON_SIZE / 2;
      Animated.spring(sunPositionAnim, {
        toValue: targetPosition,
        useNativeDriver: false,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [darkHeight, isDragging]);

  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only activate if vertical movement is greater than horizontal
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: (evt) => {
        setIsDragging(true);
        startY.current = evt.nativeEvent.pageY;
        startValue.current = currentValue;
      },
      onPanResponderMove: (evt, gestureState) => {
        // Calculate change based on vertical movement
        // Dragging down (positive dy) decreases brightness
        // Dragging up (negative dy) increases brightness
        const deltaY = gestureState.dy;
        const sliderHeight = SLIDER_HEIGHT;
        const deltaRatio = -deltaY / sliderHeight; // Negative because dragging down should decrease
        const newValue = Math.max(0, Math.min(1, startValue.current + deltaRatio));
        setCurrentValue(newValue);
        onValueChange(newValue);
        
        // Update sun position immediately during drag for responsive feedback
        const newDarkHeight = (1 - newValue) * SLIDER_HEIGHT;
        const newSunPosition = newDarkHeight - SUN_ICON_SIZE / 2;
        sunPositionAnim.setValue(newSunPosition);
      },
      onPanResponderRelease: () => {
        setIsDragging(false);
      },
      onPanResponderTerminationRequest: () => false, // Prevent parent from taking over
    })
  ).current;

  const handlePress = (evt: any) => {
    const { locationY } = evt.nativeEvent;
    // Top of slider is 0 brightness (dark), bottom is 1 brightness (bright)
    // locationY: 0 at top, SLIDER_HEIGHT at bottom
    const newValue = Math.max(0, Math.min(1, 1 - (locationY / SLIDER_HEIGHT)));
    setCurrentValue(newValue);
    onValueChange(newValue);
  };

  // Position of sun icon (always use animated value for smooth updates)

  return (
    <View style={{ margin: 0 }}>
      <View
        ref={containerRef}
        style={{
          width: SLIDER_WIDTH,
          height: SLIDER_HEIGHT,
          position: 'relative',
        }}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={handlePress}
          style={{
            width: SLIDER_WIDTH,
            height: SLIDER_HEIGHT,
            borderRadius: 40,
            overflow: 'hidden',
            backgroundColor: '#4a3d38',
          }}
          disabled={isDragging}
        >
          {/* Dark section at top */}
          <View style={{
            width: '100%',
            height: darkHeight,
            backgroundColor: '#4a3d38',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }} />
          
          {/* White section at bottom */}
          <View style={{
            width: '100%',
            height: whiteHeight,
            backgroundColor: '#ffffff',
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            position: 'relative',
          }}>
            {/* Gradient overlay for smooth transition */}
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 20,
              }}
            />
          </View>
        </TouchableOpacity>
        
        {/* Sun icon at the boundary between dark and white, positioned absolutely relative to container */}
        <Animated.View
          style={{
            position: 'absolute',
            left: (SLIDER_WIDTH - SUN_ICON_SIZE) / 2,
            width: SUN_ICON_SIZE,
            height: SUN_ICON_SIZE,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            top: sunPositionAnim,
          }}
        >
          <View style={{
            width: SUN_ICON_SIZE,
            height: SUN_ICON_SIZE,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 36 }}>☀️</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

export function BrightnessControl({}: Props) {
  const [brightnessLevels, setBrightnessLevels] = useState<number[]>(
    Array(20).fill(0).map(() => Math.random() * 0.4 + 0.3)
  );

  const updateBrightness = (index: number, value: number) => {
    const newLevels = [...brightnessLevels];
    newLevels[index] = value;
    setBrightnessLevels(newLevels);
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#000000',
    }}>
      <ScrollView 
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          padding: 20,
          paddingTop: 60,
          paddingBottom: 40,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
      >
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 20,
        }}>
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

