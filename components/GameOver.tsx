'use client'

import { useGameStore } from '@/data/store'
import { motion } from 'framer-motion'

export function GameOver() {
  const { score, restartGame, answers } = useGameStore()
  const totalQuestions = answers.length
  const correctAnswers = answers.filter(a => a).length

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10 my-10 text-center"
    >
      <h1 className="text-4xl font-black text-blue-900 mb-4">Tamat Permainan!</h1>
      <p className="text-xl text-gray-600 mb-8">Hebat! Kamu telah menyelesaikan cabaran ini.</p>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100">
          <p className="text-sm font-bold text-blue-600 uppercase mb-1">Keputusan</p>
          <p className="text-3xl font-black text-blue-900">{correctAnswers} / {totalQuestions}</p>
        </div>
        <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-100">
          <p className="text-sm font-bold text-amber-600 uppercase mb-1">Jumlah Markah</p>
          <p className="text-3xl font-black text-amber-900">{score}</p>
        </div>
      </div>

      <button
        onClick={restartGame}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-lg transition-all active:scale-95"
      >
        Main Semula
      </button>
    </motion.div>
  )
}
