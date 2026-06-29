'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Effects: React.FC = () => {
  const [confetti, setConfetti] = useState<{ id: number, x: number, color: string }[]>([])

  const triggerConfetti = () => {
    const newConfetti = Array.from({ length: 50 }).map((_, i) => ({
      id: Math.random(),
      x: Math.random() * 100,
      color: ['#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)]
    }))
    setConfetti(newConfetti)
    setTimeout(() => setConfetti([]), 3000)
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            initial={{ y: -20, x: `${c.x}vw`, opacity: 1, rotate: 0 }}
            animate={{ y: '110vh', rotate: 360, x: `${c.x + (Math.random() * 10 - 5)}vw` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 + Math.random() * 2, ease: 'easeIn' }}
            className="absolute w-3 h-3"
            style={{ backgroundColor: c.color }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export const VictoryAnimation: React.FC = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="text-center space-y-4"
  >
    <div className="text-8xl">🎉</div>
    <h2 className="text-4xl font-black text-blue-900">Syabas! Kamu Menang!</h2>
    <p className="text-xl text-gray-600">Kamu telah menguasai kemahiran wang hari ini.</p>
  </motion.div>
)
