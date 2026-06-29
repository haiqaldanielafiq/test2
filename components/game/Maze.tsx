'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/data/store'
import { allQuestions } from '@/data/questions'
import { Enemy } from './Enemy'

const TILE_SIZE = 40
const MAZE_WIDTH = 15
const MAZE_HEIGHT = 10

const INITIAL_MAZE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

export const Maze: React.FC = () => {
  const { score, addScore, setCurrentQuestion, lives, loseLife, gameStatus, endGame, level, nextLevel } = useGameStore()
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 })
  const [maze, setMaze] = useState(INITIAL_MAZE.map(row => [...row]))

  const enemies = useMemo(() => [
    { id: 'e1', initialPosition: { x: 13, y: 5 } },
    { id: 'e2', initialPosition: { x: 1, y: 5 } }
  ], [])

  const coinsRemaining = useMemo(() => {
    let count = 0
    for (const row of maze) {
      for (const cell of row) {
        if (cell === 2) count++
      }
    }
    return count
  }, [maze])

  useEffect(() => {
    if (coinsRemaining === 0 && gameStatus === 'playing') {
      nextLevel()
      setMaze(INITIAL_MAZE.map(row => [...row]))
      setPlayerPosition({ x: 1, y: 1 })
    }
  }, [coinsRemaining, gameStatus, nextLevel])

  const movePlayer = useCallback((dx: number, dy: number) => {
    if (gameStatus !== 'playing') return

    setPlayerPosition((prev) => {
      const newX = prev.x + dx
      const newY = prev.y + dy

      if (
        newX >= 0 &&
        newX < MAZE_WIDTH &&
        newY >= 0 &&
        newY < MAZE_HEIGHT &&
        maze[newY][newX] !== 1
      ) {
        if (maze[newY][newX] === 2) {
          addScore(10)
          setMaze(prevMaze => {
            const newMaze = prevMaze.map(row => [...row])
            newMaze[newY][newX] = 0
            return newMaze
          })
        }

        if (Math.random() < 0.05) {
          const randomQ = allQuestions[Math.floor(Math.random() * allQuestions.length)]
          setCurrentQuestion(randomQ.id)
        }

        return { x: newX, y: newY }
      }
      return prev
    })
  }, [maze, addScore, setCurrentQuestion, gameStatus])

  const handleEnemyCollision = useCallback(() => {
    loseLife()
    setPlayerPosition({ x: 1, y: 1 })
  }, [loseLife])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': movePlayer(0, -1); break
        case 'ArrowDown': movePlayer(0, 1); break
        case 'ArrowLeft': movePlayer(-1, 0); break
        case 'ArrowRight': movePlayer(1, 0); break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [movePlayer])

  return (
    <div className="relative bg-gray-900 p-4 rounded-xl shadow-2xl overflow-hidden border-4 border-blue-500">
      <div
        className="grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${MAZE_WIDTH}, ${TILE_SIZE}px)`,
          gridTemplateRows: `repeat(${MAZE_HEIGHT}, ${TILE_SIZE}px)`
        }}
      >
        {maze.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`w-[40px] h-[40px] flex items-center justify-center ${
                cell === 1 ? 'bg-blue-900 border border-blue-800 shadow-inner' : 'bg-gray-800'
              }`}
            >
              {cell === 2 && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Enemies */}
      {enemies.map((enemy) => (
        <Enemy
          key={enemy.id}
          initialPosition={enemy.initialPosition}
          playerPosition={playerPosition}
          onCollision={handleEnemyCollision}
        />
      ))}

      {/* Player */}
      <motion.div
        animate={{
          x: playerPosition.x * TILE_SIZE,
          y: playerPosition.y * TILE_SIZE
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="absolute top-4 left-4 w-[40px] h-[40px] flex items-center justify-center"
      >
        <div className="w-8 h-8 bg-yellow-300 rounded-full border-2 border-yellow-500 shadow-lg relative">
          <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full" />
          <div className="absolute bottom-1 left-2 w-4 h-1 bg-black rounded-full" />
        </div>
      </motion.div>
    </div>
  )
}
