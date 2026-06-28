import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, Achievement } from '@/types/user';

interface ProgressActions {
  unlockLevel: (levelId: number) => void;
  updateHighScore: (levelId: number, score: number) => void;
  addAchievement: (achievement: Achievement) => void;
  addTotalCoins: (amount: number) => void;
  recordMistake: (topic: string) => void;
  resetProgress: () => void;
}

const initialState: UserProgress = {
  unlockedLevels: [1],
  highScores: {},
  achievements: [],
  totalCoins: 0,
  timePlayed: 0,
  mistakesByTopic: {},
};

export const useProgressStore = create<UserProgress & ProgressActions>()(
  persist(
    (set) => ({
      ...initialState,

      unlockLevel: (levelId) => set((state) => ({
        unlockedLevels: state.unlockedLevels.includes(levelId)
          ? state.unlockedLevels
          : [...state.unlockedLevels, levelId]
      })),

      updateHighScore: (levelId, score) => set((state) => ({
        highScores: {
          ...state.highScores,
          [levelId]: Math.max(state.highScores[levelId] || 0, score)
        }
      })),

      addAchievement: (achievement) => set((state) => ({
        achievements: state.achievements.some(a => a.id === achievement.id)
          ? state.achievements
          : [...state.achievements, { ...achievement, unlockedAt: new Date().toISOString() }]
      })),

      addTotalCoins: (amount) => set((state) => ({ totalCoins: state.totalCoins + amount })),

      recordMistake: (topic) => set((state) => ({
        mistakesByTopic: {
          ...state.mistakesByTopic,
          [topic]: (state.mistakesByTopic[topic] || 0) + 1
        }
      })),

      resetProgress: () => set(initialState),
    }),
    {
      name: 'math-quest-progress',
    }
  )
);
