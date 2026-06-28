import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSettings } from '@/types/user';

interface SettingsActions {
  updateSettings: (settings: Partial<UserSettings>) => void;
}

const initialState: UserSettings = {
  musicVolume: 0.5,
  sfxVolume: 0.7,
  darkMode: false,
  language: 'ms',
  fontSize: 'medium',
  accessibility: {
    reducedMotion: false,
    highContrast: false,
    colorBlindMode: false,
  },
};

export const useSettingsStore = create<UserSettings & SettingsActions>()(
  persist(
    (set) => ({
      ...initialState,
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
    }),
    {
      name: 'math-quest-settings',
    }
  )
);
