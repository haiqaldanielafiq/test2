export interface Position {
  x: number
  y: number
}

export interface Entity {
  id: string
  position: Position
  type: 'player' | 'enemy' | 'coin' | 'powerup'
}

export interface Achievement {
  id: string
  title: string
  description: string
  unlocked: boolean
  icon: string
}

export interface GameSettings {
  soundEnabled: boolean
  musicEnabled: boolean
  theme: 'light' | 'dark'
}

export interface GameState {
  score: number
  lives: number
  level: number
  isPaused: boolean
  gameStatus: 'start' | 'playing' | 'paused' | 'ended'
  inventory: string[]
  achievements: Achievement[]
  settings: GameSettings
}
