import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

// Game Constants
const { width } = Dimensions.get('window');
const GRID_COLS = 4;
const CARD_SIZE = (width - 60) / GRID_COLS;
const ICONS = ['🔥', '⚡', '💎', '🚀', '👾', '🍀', '🎵', '🕹️'];

// Types
interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface UseMemoryGameReturn {
  cards: Card[];
  moves: number;
  matches: number;
  gameWon: boolean;
  handleCardPress: (index: number) => void;
  resetGame: () => void;
  CARD_SIZE: number;
  GRID_COLS: number;
}

export function useMemoryGame(): UseMemoryGameReturn {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const pairs = [...ICONS, ...ICONS];
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    const newCards = shuffled.map((icon, index) => ({
      id: index,
      icon,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(newCards);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setIsProcessing(false);
    setGameWon(false);
  };

  const handleCardPress = (index: number) => {
    if (isProcessing || cards[index].isMatched || cards[index].isFlipped) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves(m => m + 1);
      setIsProcessing(true);
      checkForMatch(newFlippedIndices);
    }
  };

  const checkForMatch = (indices: number[]) => {
    const [firstIndex, secondIndex] = indices;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (firstCard.icon === secondCard.icon) {
      const newCards = [...cards];
      newCards[firstIndex].isMatched = true;
      newCards[secondIndex].isMatched = true;
      setCards(newCards);

      setMatches(m => {
        const newMatches = m + 1;
        if (newMatches === ICONS.length) setGameWon(true);
        return newMatches;
      });

      setFlippedIndices([]);
      setIsProcessing(false);
    } else {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;
        setCards(newCards);
        setFlippedIndices([]);
        setIsProcessing(false);
      }, 1000);
    }
  };

  return {
    cards,
    moves,
    matches,
    gameWon,
    handleCardPress,
    resetGame,
    CARD_SIZE,
    GRID_COLS,
  };
}