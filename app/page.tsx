'use client'

import { useGameStore } from '@/data/store'
import { Header } from '@/components/Header'
import { QuestionCard } from '@/components/QuestionCard'
import { GameOver } from '@/components/GameOver'
import { questions } from '@/data/questions'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const { gameStatus, startGame, currentQuestionIndex } = useGameStore()

  const qCount = (questions && Array.isArray(questions)) ? questions.length : 0
  const isGameEnded = gameStatus === 'playing' && currentQuestionIndex >= qCount

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-400 to-indigo-600 px-4 py-8 md:py-12">
      <AnimatePresence mode="wait">
        {gameStatus === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl max-w-xl border-8 border-blue-200">
              <h1 className="text-5xl md:text-6xl font-black text-blue-900 mb-6 leading-tight">
                Math Quest:<br/><span className="text-blue-600">Wang Tahun 4</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 font-medium">
                Jom uji pengetahuan kamu tentang pengurusan wang!
              </p>
              <button
                onClick={startGame}
                className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-blue-600 font-pj rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 text-2xl shadow-xl hover:bg-blue-700 active:scale-95"
              >
                Mulakan Permainan
              </button>
            </div>
          </motion.div>
        )}

        {gameStatus === 'playing' && !isGameEnded && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center"
          >
            <Header />
            <QuestionCard />
          </motion.div>
        )}

        {isGameEnded && (
          <motion.div
            key="ended"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex justify-center"
          >
            <GameOver />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
