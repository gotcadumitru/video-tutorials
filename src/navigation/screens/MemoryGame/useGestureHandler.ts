import { useEffect, useRef } from 'react';
import { PanResponder } from 'react-native';

type Direction = 'up' | 'down' | 'left' | 'right';

const SWIPE_THRESHOLD = 50;

export const useGestureHandler = (onMove: (direction: Direction) => void) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { dx, dy } = gestureState;

        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal swipe
          if (Math.abs(dx) > SWIPE_THRESHOLD) {
            onMove(dx > 0 ? 'right' : 'left');
          }
        } else {
          // Vertical swipe
          if (Math.abs(dy) > SWIPE_THRESHOLD) {
            onMove(dy > 0 ? 'down' : 'up');
          }
        }
      },
    })
  ).current;

  return panResponder.panHandlers;
};
