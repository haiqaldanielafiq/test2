'use client'

import { useGameStore } from '@/data/store'
import { questions } from '@/data/questions'

export function Header() {
  const { score, currentQuestionIndex } = useGameStore()

  return (
    <header className="w-full max-w-2xl mx-auto p-4 flex justify-between items-center bg-white/80 backdrop-blur shadow-md rounded-b-2xl sticky top-0 z-10">
      <div className="flex flex-col">
        <span className="text-xs uppercase font-bold text-blue-600">Progres</span>
        <span className="text-lg font-black text-blue-900">
          {Math.min(currentQuestionIndex + 1, questions.length)} / {questions.length}
        </span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs uppercase font-bold text-amber-600">Markah</span>
        <span className="text-2xl font-black text-amber-900">{score}</span>
      </div>
    </header>
  )
}
