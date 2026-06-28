import { LevelDefinition } from "@/types/game";
import { Achievement } from "@/types/user";

export const LEVELS: LevelDefinition[] = [
  {
    id: 1,
    title: "Nilai Wang",
    description: "Mengenal Ringgit dan Sen serta penukaran unit.",
    topic: "WANG",
    requiredScore: 80,
  },
  {
    id: 2,
    title: "Tambah Wang",
    description: "Operasi tambah melibatkan wang.",
    topic: "WANG",
    requiredScore: 80,
  },
  {
    id: 3,
    title: "Tolak Wang",
    description: "Operasi tolak melibatkan wang.",
    topic: "WANG",
    requiredScore: 80,
  },
  {
    id: 4,
    title: "Kira Baki",
    description: "Mengira baki wang dalam transaksi.",
    topic: "WANG",
    requiredScore: 80,
  },
  {
    id: 5,
    title: "Selesaikan Masalah",
    description: "Masalah harian melibatkan wang.",
    topic: "WANG",
    requiredScore: 80,
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'math-hero', title: 'Math Hero', description: 'Complete all levels', icon: '🏆' },
  { id: 'money-master', title: 'Money Master', description: 'Get 100% accuracy in a level', icon: '💰' },
  { id: 'fast-thinker', title: 'Fast Thinker', description: 'Complete a level in under 2 minutes', icon: '⚡' },
  { id: 'perfect-player', title: 'Perfect Player', description: 'Finish a level with all hearts', icon: '⭐' },
  { id: 'coin-collector', title: 'Coin Collector', description: 'Collect 100 coins total', icon: '🪙' },
];

export const INITIAL_HEARTS = 3;
export const POINTS_PER_CORRECT = 10;
export const COINS_PER_CORRECT = 1;
export const GAME_TIMER_SECONDS = 300; // 5 minutes
