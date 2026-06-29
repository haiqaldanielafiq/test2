'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/data/store'
import { allQuestions } from '@/data/questions'
import { ShoppingSimulation } from './ShoppingSimulation'
import { CalculateChange } from './CalculateChange'

export const QuestionManager: React.FC = () => {
  const { currentQuestionId, setCurrentQuestion, addScore, loseLife } = useGameStore()

  if (!currentQuestionId) return null

  const question = allQuestions.find((q) => q.id === currentQuestionId)

  if (!question) return null

  const handleComplete = (isCorrect: boolean) => {
    if (isCorrect) {
      addScore(50)
    } else {
      loseLife()
    }
    setTimeout(() => {
      setCurrentQuestion(null)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {question.type === 'multiple-choice' && (
          <div className="p-8">
             <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>
             <div className="grid grid-cols-1 gap-4">
                {question.choices?.map((choice) => (
                    <button
                        key={choice.id}
                        onClick={() => handleComplete(choice.isCorrect)}
                        className="p-4 text-left border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-semibold"
                    >
                        {choice.text}
                    </button>
                ))}
             </div>
          </div>
        )}

        {question.type === 'shopping-simulation' && (
          <ShoppingSimulation
            question={question}
            onComplete={handleComplete}
          />
        )}

        {question.type === 'calculate-change' && (
          <CalculateChange
            question={question}
            onComplete={handleComplete}
          />
        )}
      </div>
    </motion.div>
  )
}
