'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/data/store'
import { questions } from '@/data/questions'
import { useState } from 'react'

export function QuestionCard() {
  const { currentQuestionIndex, nextQuestion } = useGameStore()
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const question = questions[currentQuestionIndex]

  if (!question) return null

  const handleChoiceClick = (choice: string) => {
    if (isAnswered) return
    setSelectedChoice(choice)
    setIsAnswered(true)

    const isCorrect = choice === question.answer

    setTimeout(() => {
      nextQuestion(isCorrect)
      setSelectedChoice(null)
      setIsAnswered(false)
    }, 1500)
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 my-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center leading-tight">
          {question.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.choices.map((choice) => {
            const isSelected = selectedChoice === choice
            const isCorrect = choice === question.answer

            let bgColor = "bg-blue-50 hover:bg-blue-100 border-blue-200"
            if (isAnswered) {
              if (isCorrect) bgColor = "bg-green-500 border-green-600 text-white"
              else if (isSelected) bgColor = "bg-red-500 border-red-600 text-white"
              else bgColor = "bg-gray-100 border-gray-200 text-gray-400"
            }

            return (
              <motion.button
                whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                key={choice}
                onClick={() => handleChoiceClick(choice)}
                disabled={isAnswered}
                className={`choice-button p-6 text-lg font-semibold rounded-2xl border-2 transition-colors duration-200 ${bgColor}`}
              >
                {choice}
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
