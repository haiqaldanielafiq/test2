'use client'

import { useGameStore } from '@/data/store'
import { MainMenu } from '@/components/ui/MainMenu'
import { Header } from '@/components/Header'
import { Maze } from '@/components/game/Maze'
import { QuestionManager } from '@/components/game/QuestionManager'
import { SettingsMenu } from '@/components/ui/SettingsMenu'
import { Dashboard } from '@/components/ui/Dashboard'
import { Effects, VictoryAnimation } from '@/components/ui/Effects'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function Home() {
  const { gameStatus, pauseGame, settings, lives, resetGame } = useGameStore()

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [settings.theme])

  const isGameOver = gameStatus === 'ended' && lives <= 0

  return (
    <main className="min-h-screen bg-math-blue-50 dark:bg-slate-900 transition-colors duration-500">
      <AnimatePresence mode="wait">
        {gameStatus === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center pt-20"
          >
            <MainMenu />
            <Dashboard />
          </motion.div>
        )}

        {gameStatus === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center pb-20"
          >
            <Header />
            <div className="mt-8 flex flex-col items-center gap-6">
               <Maze />
               <div className="flex gap-4">
                  <button
                    onClick={pauseGame}
                    className="px-6 py-2 bg-white/50 backdrop-blur rounded-xl font-bold text-blue-600 hover:bg-white transition-all shadow-sm"
                  >
                    ⏸️ Berhenti Seketika
                  </button>
               </div>
            </div>
            <QuestionManager />
          </motion.div>
        )}

        {(gameStatus === 'paused') && (
           <SettingsMenu key="settings" />
        )}

        {gameStatus === 'ended' && (
          <motion.div
            key="ended"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 flex items-center justify-center p-6 z-[100]"
          >
             <div className="bg-white dark:bg-slate-800 p-12 rounded-[3rem] shadow-2xl text-center max-w-lg border-8 border-blue-100 dark:border-blue-900/30">
                {lives > 0 ? (
                  <VictoryAnimation />
                ) : (
                  <div className="space-y-4">
                    <div className="text-8xl">😢</div>
                    <h2 className="text-4xl font-black text-red-600">Permainan Tamat</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">Jangan putus asa! Cuba lagi untuk menguasai kemahiran wang.</p>
                  </div>
                )}
                <button
                  onClick={resetGame}
                  className="mt-8 px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-700 transition-all active:scale-95"
                >
                  Main Semula
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Effects />
    </main>
  )
}
