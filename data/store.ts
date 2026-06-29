import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GameState, GameSettings, Achievement } from '@/types/game'

interface GameStore extends GameState {
  // Actions
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  endGame: () => void
  resetGame: () => void

  addScore: (points: number) => void
  loseLife: () => void
  nextLevel: () => void

  updateSettings: (settings: Partial<GameSettings>) => void
  unlockAchievement: (achievementId: string) => void

  currentQuestionId: string | null
  setCurrentQuestion: (id: string | null) => void
}

const initialAchievements: Achievement[] = [
  { id: 'first_win', title: 'Pemenang Pertama', description: 'Menang permainan buat kali pertama', unlocked: false, icon: '🏆' },
  { id: 'math_genius', title: 'Genius Matematik', description: 'Jawab 10 soalan berturut-turut dengan betul', unlocked: false, icon: '🧠' },
  { id: 'money_saver', title: 'Penabung Bijak', description: 'Kumpul RM100 dalam permainan', unlocked: false, icon: '💰' },
]

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      score: 0,
      lives: 3,
      level: 1,
      isPaused: false,
      gameStatus: 'start',
      inventory: [],
      achievements: initialAchievements,
      settings: {
        soundEnabled: true,
        musicEnabled: true,
        theme: 'light',
      },
      currentQuestionId: null,

      startGame: () => set({ gameStatus: 'playing', score: 0, lives: 3, level: 1, isPaused: false }),
      pauseGame: () => set({ isPaused: true, gameStatus: 'paused' }),
      resumeGame: () => set({ isPaused: false, gameStatus: 'playing' }),
      endGame: () => set({ gameStatus: 'ended' }),
      resetGame: () => set({ gameStatus: 'start', score: 0, lives: 3, level: 1, isPaused: false, currentQuestionId: null }),

      addScore: (points) => set((state) => ({ score: state.score + points })),
      loseLife: () => set((state) => {
        const newLives = state.lives - 1
        return {
          lives: newLives,
          gameStatus: newLives <= 0 ? 'ended' : state.gameStatus
        }
      }),
      nextLevel: () => set((state) => ({ level: state.level + 1 })),

      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),

      unlockAchievement: (id) => set((state) => ({
        achievements: state.achievements.map((a) =>
          a.id === id ? { ...a, unlocked: true } : a
        )
      })),

      setCurrentQuestion: (id) => set({ currentQuestionId: id }),
    }),
    {
      name: 'math-quest-storage',
      partialize: (state) => ({
        achievements: state.achievements,
        settings: state.settings,
        score: state.score
      }),
    }
  )
)
