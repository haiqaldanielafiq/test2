'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/data/store'

export const MainMenu: React.FC = () => {
  const { startGame, updateSettings, settings } = useGameStore()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl max-w-xl border-8 border-blue-200"
      >
        <h1 className="text-5xl md:text-6xl font-black text-blue-900 mb-6 leading-tight">
          Math Quest:<br/><span className="text-blue-600 font-extrabold">Wang Tahun 4</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 font-medium">
          Terokai dunia matematik dan kuasai kemahiran mengurus wang!
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={startGame}
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-blue-600 rounded-2xl shadow-xl hover:bg-blue-700 active:scale-95 text-2xl"
          >
            Mulakan Pengembaraan
          </button>

          <div className="flex justify-center gap-4 mt-4">
            <button
               onClick={() => updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' })}
               className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              {settings.theme === 'light' ? '🌙 Gelap' : '☀️ Cerah'}
            </button>
            <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              🏆 Pencapaian
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
