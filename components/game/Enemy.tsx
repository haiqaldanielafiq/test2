'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Position } from '@/types/game'

interface EnemyProps {
  initialPosition: Position
  onCollision: () => void
  playerPosition: Position
}

export const Enemy: React.FC<EnemyProps> = ({ initialPosition, onCollision, playerPosition }) => {
  const [pos, setPos] = useState(initialPosition)

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPos((prev) => {
        // Simple AI: move towards player
        const dx = playerPosition.x > prev.x ? 1 : playerPosition.x < prev.x ? -1 : 0
        const dy = playerPosition.y > prev.y ? 1 : playerPosition.y < prev.y ? -1 : 0

        // Only move in one direction at a time
        const newPos = Math.random() > 0.5
          ? { ...prev, x: prev.x + dx }
          : { ...prev, y: prev.y + dy }

        return newPos
      })
    }, 1000)

    return () => clearInterval(moveInterval)
  }, [playerPosition])

  useEffect(() => {
    if (pos.x === playerPosition.x && pos.y === playerPosition.y) {
      onCollision()
    }
  }, [pos, playerPosition, onCollision])

  return (
    <motion.div
      animate={{
        x: pos.x * 40,
        y: pos.y * 40
      }}
      transition={{ duration: 0.5 }}
      className="absolute top-4 left-4 w-[40px] h-[40px] flex items-center justify-center pointer-events-none"
    >
      <div className="w-8 h-8 bg-red-500 rounded-t-full shadow-lg relative">
        <div className="absolute top-2 left-1 w-2 h-2 bg-white rounded-full">
            <div className="w-1 h-1 bg-black rounded-full absolute top-0.5 right-0" />
        </div>
        <div className="absolute top-2 right-1 w-2 h-2 bg-white rounded-full">
            <div className="w-1 h-1 bg-black rounded-full absolute top-0.5 right-0" />
        </div>
        <div className="absolute -bottom-1 left-0 right-0 flex justify-around">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <div className="w-2 h-2 bg-red-500 rounded-full" />
        </div>
      </div>
    </motion.div>
  )
}
