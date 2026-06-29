'use client'

import React from 'react'
import { useGameStore } from '@/data/store'
import { motion, AnimatePresence } from 'framer-motion'

export const SettingsMenu: React.FC = () => {
  const { settings, updateSettings, isPaused, resumeGame, resetGame } = useGameStore()

  if (!isPaused) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 space-y-8"
      >
        <h2 className="text-3xl font-black text-gray-800 text-center">Tetapan</h2>

        <div className="space-y-4">
          <SettingToggle
            label="Kesan Bunyi"
            enabled={settings.soundEnabled}
            onToggle={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
          />
          <SettingToggle
            label="Muzik Latar"
            enabled={settings.musicEnabled}
            onToggle={() => updateSettings({ musicEnabled: !settings.musicEnabled })}
          />
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button
            onClick={resumeGame}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg active:scale-95"
          >
            Sambung Permainan
          </button>
          <button
            onClick={resetGame}
            className="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all"
          >
            Kembali ke Menu Utama
          </button>
        </div>
      </motion.div>
    </div>
  )
}

const SettingToggle = ({ label, enabled, onToggle }: { label: string, enabled: boolean, onToggle: () => void }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
    <span className="font-bold text-gray-700">{label}</span>
    <button
      onClick={onToggle}
      className={`w-14 h-8 rounded-full transition-colors relative ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}
    >
      <motion.div
        animate={{ x: enabled ? 24 : 4 }}
        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm"
      />
    </button>
  </div>
)
