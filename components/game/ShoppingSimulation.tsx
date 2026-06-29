'use client'

import React, { useState } from 'react'
import { Question, ShoppingItem } from '@/types/question'
import { motion } from 'framer-motion'

interface Props {
  question: Question
  onComplete: (isCorrect: boolean) => void
}

export const ShoppingSimulation: React.FC<Props> = ({ question, onComplete }) => {
  const [selectedItems, setSelectedItems] = useState<ShoppingItem[]>([])

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0)
  const isOverBudget = totalPrice > (question.budget || 0)

  const toggleItem = (item: ShoppingItem) => {
    if (selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const handleSubmit = () => {
    const isCorrect = totalPrice > 0 && !isOverBudget
    onComplete(isCorrect)
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{question.question}</h2>
      <p className="text-blue-600 font-bold mb-6">Bajet: RM{question.budget}</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {question.items?.map((item) => {
          const isSelected = selectedItems.find((i) => i.id === item.id)
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item)}
              className={`p-4 border-2 rounded-xl transition-all text-left ${
                isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-100'
              }`}
            >
              <div className="font-bold text-gray-800">{item.name}</div>
              <div className="text-blue-600">RM{item.price.toFixed(2)}</div>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between border-t pt-6">
        <div>
          <div className="text-sm text-gray-500">Jumlah:</div>
          <div className={`text-2xl font-black ${isOverBudget ? 'text-red-500' : 'text-green-600'}`}>
            RM{totalPrice.toFixed(2)}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={selectedItems.length === 0}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          Selesai
        </button>
      </div>
    </div>
  )
}
