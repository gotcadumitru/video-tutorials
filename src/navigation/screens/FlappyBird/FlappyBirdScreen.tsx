import React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFlappyBird,
  BIRD_START_X,
  OBSTACLE_GAP,
  PIPE_CAP_HEIGHT,
} from './useFlappyBird';
import { styles } from './styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export function FlappyBird() {
  const {
    gameRunning,
    gameOver,
    birdPosition,
    obstacles,
    score,
    bestScore,
    birdRotationStyle,
    jump,
    startGame,
  } = useFlappyBird();

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#87CEEB', '#98D8E8', '#B0E0E6', '#E0F6FF']}
          style={styles.sky}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={styles.cloud1} />
          <View style={styles.cloud2} />
          <View style={styles.cloud3} />
          <View style={styles.cloud4} />
        </LinearGradient>

      <View style={styles.ground} />

      {obstacles.map((obs) => (
        <React.Fragment key={obs.id}>
          <View
            style={[
              styles.pipe,
              {
                left: obs.x,
                top: 0,
                height: obs.topHeight,
              },
            ]}
          />
          <View
            style={[
              styles.pipeCap,
              {
                left: obs.x - 5,
                top: obs.topHeight - PIPE_CAP_HEIGHT,
              },
            ]}
          />
          <View
            style={[
              styles.pipe,
              {
                left: obs.x,
                top: obs.topHeight + OBSTACLE_GAP,
                height: SCREEN_HEIGHT - (obs.topHeight + OBSTACLE_GAP),
              },
            ]}
          />
          <View
            style={[
              styles.pipeCap,
              {
                left: obs.x - 5,
                top: obs.topHeight + OBSTACLE_GAP,
              },
            ]}
          />
        </React.Fragment>
      ))}

      <Animated.View
        style={[
          styles.bird,
          {
            left: BIRD_START_X,
            top: birdPosition,
          },
          birdRotationStyle,
        ]}
      >
        <View style={styles.birdBody} />
        <View style={styles.birdEye} />
        <View style={styles.birdBeak} />
      </Animated.View>

     
      {(!gameRunning || gameOver) && (
        <View style={styles.menuContainer}>
          <Text style={styles.titleText}>FLAPPY BIRD</Text>
          
              <Text style={styles.gameOverText}>GAME OVER</Text>
              <Text style={styles.scoreDisplay}>Score: {score}</Text>
              {bestScore > 0 && (
                <Text style={styles.bestScoreText}>Best: {bestScore}</Text>
              )}
              <TouchableOpacity
                style={styles.button}
                onPress={startGame}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>PLAY AGAIN</Text>
              </TouchableOpacity>
        </View>
      )}
      </View>
    </TouchableWithoutFeedback>
  );
}
