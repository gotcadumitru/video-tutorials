import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemoryGame } from './useMemoryGame';
import { styles } from './styles';

export default function MemoryGame() {
  const {
    cards,
    moves,
    matches,
    gameWon,
    handleCardPress,
    resetGame,
    CARD_SIZE,
    GRID_COLS,
  } = useMemoryGame();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#000428", "#004e92"]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Header Area */}
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>
                  MIND<Text style={styles.accent}>MATRIX</Text>
                </Text>
                <Text style={styles.subtitle}>MATCH THE SYMBOLS</Text>
              </View>
              <View style={styles.statsBox}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>MOVES</Text>
                  <Text style={styles.statValue}>{moves}</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>PAIRS</Text>
                  <Text style={styles.statValue}>{matches}/{GRID_COLS * GRID_COLS / 2}</Text>
                </View>
              </View>
            </View>

            {/* Game Grid */}
            <View style={styles.grid}>
              {cards.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.card,
                    { width: CARD_SIZE, height: CARD_SIZE },
                    card.isFlipped || card.isMatched
                      ? styles.cardFlipped
                      : styles.cardFaceDown,
                    card.isMatched && styles.cardMatched,
                  ]}
                  onPress={() => handleCardPress(index)}
                  activeOpacity={0.8}
                >
                  <View style={styles.cardInner}>
                    {card.isFlipped || card.isMatched ? (
                      <Text style={styles.cardIcon}>{card.icon}</Text>
                    ) : (
                      <Text style={styles.cardBackText}>?</Text>
                    )}
                  </View>
                  {card.isMatched && <View style={styles.matchedGlow} />}
                </TouchableOpacity>
              ))}
            </View>

            {/* Win Message & Controls */}
            {gameWon ? (
              <View style={styles.winContainer}>
                <Text style={styles.winText}>SYSTEM UNLOCKED!</Text>
                <Text style={styles.winSubText}>Completed in {moves} moves</Text>
                <TouchableOpacity style={styles.resetBtn} onPress={resetGame}>
                  <Text style={styles.resetBtnText}>REBOOT SYSTEM</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.resetBtnSmall} onPress={resetGame}>
                <Text style={styles.resetBtnTextSmall}>RESET BOARD</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

