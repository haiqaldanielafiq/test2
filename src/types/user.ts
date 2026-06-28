export interface UserProgress {
  unlockedLevels: number[];
  highScores: Record<number, number>;
  achievements: Achievement[];
  totalCoins: number;
  timePlayed: number;
  mistakesByTopic: Record<string, number>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt?: string;
  icon: string;
}

export interface UserSettings {
  musicVolume: number;
  sfxVolume: number;
  darkMode: boolean;
  language: 'ms' | 'en';
  fontSize: 'small' | 'medium' | 'large';
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    colorBlindMode: boolean;
  };
}
