import { create } from 'zustand'

interface GameState {
  score: number
  currentQuestionIndex: number
  gameStatus: 'start' | 'playing' | 'ended'
  answers: boolean[]
  startGame: () => void
  nextQuestion: (isCorrect: boolean) => void
  restartGame: () => void
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  currentQuestionIndex: 0,
  gameStatus: 'start',
  answers: [],
  startGame: () => set({ gameStatus: 'playing', score: 0, currentQuestionIndex: 0, answers: [] }),
  nextQuestion: (isCorrect: boolean) =>
    set((state) => ({
      score: isCorrect ? state.score + 10 : state.score,
      answers: [...state.answers, isCorrect],
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),
  restartGame: () => set({ gameStatus: 'start', score: 0, currentQuestionIndex: 0, answers: [] }),
}))
