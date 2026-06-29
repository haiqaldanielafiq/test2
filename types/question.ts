export type QuestionType =
  | 'multiple-choice'
  | 'fill-in-the-blank'
  | 'shopping-simulation'
  | 'calculate-change'
  | 'matching'

export interface QuestionChoice {
  id: string
  text: string
  isCorrect: boolean
}

export interface ShoppingItem {
  id: string
  name: string
  price: number
  image?: string
}

export interface Question {
  id: string
  type: QuestionType
  question: string
  instruction?: string
  choices?: QuestionChoice[]
  correctAnswer?: string | number
  items?: ShoppingItem[]
  budget?: number
  difficulty: 'easy' | 'medium' | 'hard'
}
