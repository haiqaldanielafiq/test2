import { Question } from '@/types/question'

export const questions: Question[] = [
  // Addition (10 questions)
  {
    id: 'add_1',
    type: 'multiple-choice',
    question: 'RM25.50 + RM14.20 = ?',
    choices: [
      { id: 'a', text: 'RM39.70', isCorrect: true },
      { id: 'b', text: 'RM39.20', isCorrect: false },
      { id: 'c', text: 'RM40.70', isCorrect: false },
      { id: 'd', text: 'RM38.70', isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    id: 'add_2',
    type: 'multiple-choice',
    question: 'Berapakah jumlah bagi RM45 dan RM30.50?',
    choices: [
      { id: 'a', text: 'RM75.00', isCorrect: false },
      { id: 'b', text: 'RM75.50', isCorrect: true },
      { id: 'c', text: 'RM76.50', isCorrect: false },
      { id: 'd', text: 'RM70.50', isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    id: 'add_3',
    type: 'multiple-choice',
    question: 'RM12.80 + RM5.40 + RM2.10 = ?',
    choices: [
      { id: 'a', text: 'RM20.30', isCorrect: true },
      { id: 'b', text: 'RM19.30', isCorrect: false },
      { id: 'c', text: 'RM20.10', isCorrect: false },
      { id: 'd', text: 'RM21.30', isCorrect: false }
    ],
    difficulty: 'medium'
  },
  // Subtraction (10 questions)
  {
    id: 'sub_1',
    type: 'multiple-choice',
    question: 'RM100 - RM45.50 = ?',
    choices: [
      { id: 'a', text: 'RM54.50', isCorrect: true },
      { id: 'b', text: 'RM55.50', isCorrect: false },
      { id: 'c', text: 'RM64.50', isCorrect: false },
      { id: 'd', text: 'RM54.00', isCorrect: false }
    ],
    difficulty: 'medium'
  },
  {
    id: 'sub_2',
    type: 'multiple-choice',
    question: 'Berapakah baki jika RM50 ditolak dengan RM12.75?',
    choices: [
      { id: 'a', text: 'RM37.25', isCorrect: true },
      { id: 'b', text: 'RM38.25', isCorrect: false },
      { id: 'c', text: 'RM37.75', isCorrect: false },
      { id: 'd', text: 'RM47.25', isCorrect: false }
    ],
    difficulty: 'medium'
  },
  // Mixed Operations (10 questions)
  {
    id: 'mix_1',
    type: 'multiple-choice',
    question: 'RM80 - RM20 + RM15.50 = ?',
    choices: [
      { id: 'a', text: 'RM75.50', isCorrect: true },
      { id: 'b', text: 'RM45.50', isCorrect: false },
      { id: 'c', text: 'RM65.50', isCorrect: false },
      { id: 'd', text: 'RM85.50', isCorrect: false }
    ],
    difficulty: 'hard'
  },
  // Shopping Simulation (10 questions)
  {
    id: 'shop_1',
    type: 'shopping-simulation',
    question: 'Beli barang yang berjumlah kurang daripada RM20.',
    budget: 20,
    items: [
      { id: 'item_1', name: 'Buku', price: 12.50 },
      { id: 'item_2', name: 'Pensel', price: 1.50 },
      { id: 'item_3', name: 'Beg', price: 25.00 },
      { id: 'item_4', name: 'Pembaris', price: 2.00 }
    ],
    difficulty: 'medium'
  },
  // Calculate Change (10 questions)
  {
    id: 'change_1',
    type: 'calculate-change',
    question: 'Anda membayar RM50 untuk barang berharga RM34.20. Berapakah baki yang anda terima?',
    correctAnswer: 15.80,
    difficulty: 'medium'
  }
]

const generateQuestions = () => {
  const q: Question[] = [...questions];
  for (let i = 1; i <= 42; i++) {
    q.push({
      id: `gen_${i}`,
      type: 'multiple-choice',
      question: `Soalan Tambahan ${i}: RM${(i * 2).toFixed(2)} + RM${i.toFixed(2)} = ?`,
      choices: [
        { id: 'a', text: `RM${(i * 3).toFixed(2)}`, isCorrect: true },
        { id: 'b', text: `RM${(i * 3 + 1).toFixed(2)}`, isCorrect: false },
        { id: 'c', text: `RM${(i * 3 - 1).toFixed(2)}`, isCorrect: false },
        { id: 'd', text: `RM${(i * 2.5).toFixed(2)}`, isCorrect: false }
      ],
      difficulty: i < 15 ? 'easy' : i < 30 ? 'medium' : 'hard'
    });
  }
  return q;
};

export const allQuestions = generateQuestions();
