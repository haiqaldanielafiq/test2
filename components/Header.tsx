'use client'

import { useGameStore } from '@/data/store'

export function Header() {
  const { score, level, lives } = useGameStore()

  return (
    <header className="w-full max-w-4xl mx-auto p-4 flex justify-between items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-md rounded-b-3xl sticky top-0 z-10 border-x border-b border-blue-100 dark:border-slate-700 transition-colors">
      <div className="flex gap-6">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-black text-blue-600 dark:text-blue-400 tracking-widest">Tahap</span>
          <span className="text-xl font-black text-blue-900 dark:text-white leading-none">
            {level}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-black text-red-500 dark:text-red-400 tracking-widest">Nyawa</span>
          <span className="text-xl font-black text-red-600 dark:text-red-400 leading-none">
            {Array.from({ length: lives }).map((_, i) => <span key={i}>❤️</span>)}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-[10px] uppercase font-black text-amber-600 tracking-widest">Markah</span>
        <span className="text-3xl font-black text-amber-900 dark:text-amber-400 leading-none">
          <span className="text-sm mr-1">RM</span>{score}
        </span>
      </div>
    </header>
  )
}
