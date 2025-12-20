import React from 'react';
import {
  StyleSheet,
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
  BIRD_SIZE,
  BIRD_START_X,
  OBSTACLE_WIDTH,
  OBSTACLE_GAP,
  PIPE_CAP_HEIGHT,
} from './useFlappyBird';

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
      {/* Sky Background - Image or Gradient */}
        <LinearGradient
          colors={['#87CEEB', '#98D8E8', '#B0E0E6', '#E0F6FF']}
          style={styles.sky}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          {/* Cloud decorations */}
          <View style={styles.cloud1} />
          <View style={styles.cloud2} />
          <View style={styles.cloud3} />
          <View style={styles.cloud4} />
        </LinearGradient>

      {/* Ground */}
      <View style={styles.ground} />

      {/* Obstacles */}
      {obstacles.map((obs) => (
        <React.Fragment key={obs.id}>
          {/* Top Pipe */}
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
          {/* Top Pipe Cap */}
          <View
            style={[
              styles.pipeCap,
              {
                left: obs.x - 5,
                top: obs.topHeight - PIPE_CAP_HEIGHT,
              },
            ]}
          />
          {/* Bottom Pipe */}
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
          {/* Bottom Pipe Cap */}
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

      {/* Bird */}
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

      {/* Score Display */}
      {gameRunning && (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      )}

      {/* Game Over / Start Screen */}
      {(!gameRunning || gameOver) && (
        <View style={styles.menuContainer}>
          <Text style={styles.titleText}>FLAPPY BIRD</Text>
          {gameOver ? (
            <>
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
            </>
          ) : (
            <>
              <Text style={styles.subText}>Tap to Start</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={startGame}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>START GAME</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      {/* Jump Button (always visible during game) */}
      {gameRunning && (
        <TouchableOpacity
          style={styles.jumpButton}
          onPress={jump}
          activeOpacity={0.8}
        >
          <Text style={styles.jumpButtonText}>JUMP</Text>
        </TouchableOpacity>
      )}

      {/* Tap anywhere to jump hint */}
      {gameRunning && (
        <View style={styles.tapHint}>
          <Text style={styles.tapHintText}>Tap anywhere to jump</Text>
        </View>
      )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    overflow: 'hidden',
  },
  sky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cloud1: {
    position: 'absolute',
    top: 60,
    left: 50,
    width: 120,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 60,
    shadowColor: 'rgba(255, 255, 255, 0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  cloud2: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 40,
  },
  cloud3: {
    position: 'absolute',
    top: 100,
    left: 200,
    width: 140,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 70,
  },
  cloud4: {
    position: 'absolute',
    top: 130,
    left: 350,
    width: 100,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#8B4513',
    borderTopWidth: 5,
    borderTopColor: '#654321',
  },
  bird: {
    position: 'absolute',
    width: BIRD_SIZE,
    height: BIRD_SIZE,
    zIndex: 10,
  },
  birdBody: {
    width: BIRD_SIZE,
    height: BIRD_SIZE,
    backgroundColor: '#FFD700',
    borderRadius: BIRD_SIZE / 2,
    borderWidth: 3,
    borderColor: '#000',
  },
  birdEye: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#000',
    borderRadius: 4,
  },
  birdBeak: {
    position: 'absolute',
    right: -6,
    top: BIRD_SIZE / 2 - 4,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderLeftColor: '#FF8C00',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  pipe: {
    position: 'absolute',
    width: OBSTACLE_WIDTH,
    backgroundColor: '#228B22',
    borderWidth: 3,
    borderColor: '#000',
  },
  pipeCap: {
    position: 'absolute',
    width: OBSTACLE_WIDTH + 10,
    height: PIPE_CAP_HEIGHT,
    backgroundColor: '#32CD32',
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 5,
  },
  scoreContainer: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    zIndex: 20,
  },
  scoreText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 30,
  },
  titleText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
  },
  gameOverText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  subText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  scoreDisplay: {
    fontSize: 28,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  bestScoreText: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  jumpButton: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    backgroundColor: '#FFD700',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#000',
    zIndex: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  jumpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  tapHint: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    zIndex: 20,
  },
  tapHintText: {
    fontSize: 14,
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

