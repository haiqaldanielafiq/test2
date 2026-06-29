'use client'

import React, { useState } from 'react'
import { Question } from '@/types/question'

interface Props {
  question: Question
  onComplete: (isCorrect: boolean) => void
}

export const CalculateChange: React.FC<Props> = ({ question, onComplete }) => {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numericValue = parseFloat(value)
    const isCorrect = Math.abs(numericValue - (question.correctAnswer as number)) < 0.01
    onComplete(isCorrect)
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
            Masukkan Baki (RM)
          </label>
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full text-4xl font-black p-4 border-4 border-gray-100 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
            placeholder="0.00"
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={!value}
          className="w-full py-5 bg-blue-600 text-white text-xl font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          Hantar Jawapan
        </button>
      </form>
    </div>
  )
}
