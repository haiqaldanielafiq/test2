export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  topic: 'WANG';
  level: number;
  difficulty: Difficulty;
  question: string;
  choices: string[];
  answer: string;
  explanation?: string;
}

export interface LevelDefinition {
  id: number;
  title: string;
  description: string;
  topic: string;
  requiredScore: number;
}

export interface GameState {
  currentLevel: number;
  score: number;
  coins: number;
  hearts: number;
  timeLeft: number;
  isPaused: boolean;
  isGameOver: boolean;
  isVictory: boolean;
  currentQuestionIndex: number;
}
