'use client'

import React from 'react'
import { useGameStore } from '@/data/store'
import { motion } from 'framer-motion'

export const Dashboard: React.FC = () => {
  const { score, lives, level, achievements } = useGameStore()
  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Markah Terkumpul" value={score} icon="💰" color="text-amber-600" />
        <StatCard label="Nyawa" value={lives} icon="❤️" color="text-red-600" />
        <StatCard label="Tahap" value={level} icon="⭐" color="text-blue-600" />
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-gray-50">
        <h3 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
          <span>🏆 Pencapaian</span>
          <span className="text-sm font-normal text-gray-400">({unlockedCount}/{achievements.length})</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                achievement.unlocked ? 'border-green-100 bg-green-50' : 'border-gray-50 bg-gray-50 opacity-60'
              }`}
            >
              <div className="text-3xl">{achievement.icon}</div>
              <div>
                <div className="font-bold text-gray-800">{achievement.title}</div>
                <div className="text-xs text-gray-500">{achievement.description}</div>
              </div>
              {achievement.unlocked && <div className="ml-auto text-green-500">✓</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ label, value, icon, color }: { label: string, value: string | number, icon: string, color: string }) => (
  <div className="bg-white p-6 rounded-3xl shadow-lg border-b-8 border-gray-100 flex items-center gap-4">
    <div className="text-4xl">{icon}</div>
    <div>
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</div>
      <div className={`text-3xl font-black ${color}`}>{value}</div>
    </div>
  </div>
)
