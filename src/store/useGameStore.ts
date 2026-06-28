import { create } from 'zustand';
import { GameState } from '@/types/game';
import { INITIAL_HEARTS, GAME_TIMER_SECONDS } from '@/lib/constants';

interface GameActions {
  setGameState: (state: Partial<GameState>) => void;
  resetGame: (level: number) => void;
  addScore: (points: number) => void;
  addCoin: () => void;
  loseHeart: () => void;
  tickTimer: () => void;
}

export const useGameStore = create<GameState & GameActions>((set) => ({
  currentLevel: 1,
  score: 0,
  coins: 0,
  hearts: INITIAL_HEARTS,
  timeLeft: GAME_TIMER_SECONDS,
  isPaused: false,
  isGameOver: false,
  isVictory: false,
  currentQuestionIndex: 0,

  setGameState: (state) => set((prev) => ({ ...prev, ...state })),

  resetGame: (level) => set({
    currentLevel: level,
    score: 0,
    coins: 0,
    hearts: INITIAL_HEARTS,
    timeLeft: GAME_TIMER_SECONDS,
    isPaused: false,
    isGameOver: false,
    isVictory: false,
    currentQuestionIndex: 0,
  }),

  addScore: (points) => set((state) => ({ score: state.score + points })),
  addCoin: () => set((state) => ({ coins: state.coins + 1 })),
  loseHeart: () => set((state) => {
    const newHearts = state.hearts - 1;
    return {
      hearts: Math.max(0, newHearts),
      isGameOver: newHearts <= 0,
    };
  }),
  tickTimer: () => set((state) => {
    if (state.timeLeft <= 0) return { isGameOver: true };
    if (state.isPaused || state.isGameOver || state.isVictory) return state;
    return { timeLeft: state.timeLeft - 1 };
  }),
}));
