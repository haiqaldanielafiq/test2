import { motion, TargetAndTransition } from "framer-motion"

export const Player = ({ state = 'idle' }: { state?: 'idle' | 'run' | 'jump' }) => {
  const animations: Record<string, TargetAndTransition> = {
    idle: {
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    run: {
      x: [0, 5, 0],
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.2, repeat: Infinity }
    },
    jump: {
      y: [0, -100, 0],
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div
      animate={animations[state]}
      className="relative w-16 h-20"
    >
      {/* Body */}
      <div className="absolute inset-0 bg-blue-500 rounded-2xl shadow-lg border-4 border-blue-700">
        {/* Eyes */}
        <div className="absolute top-4 left-2 w-3 h-3 bg-white rounded-full">
           <div className="w-1.5 h-1.5 bg-black rounded-full absolute top-0.5 right-0.5" />
        </div>
        <div className="absolute top-4 right-2 w-3 h-3 bg-white rounded-full">
           <div className="w-1.5 h-1.5 bg-black rounded-full absolute top-0.5 left-0.5" />
        </div>
        {/* Smile */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-6 h-3 border-b-4 border-blue-900 rounded-full" />
      </div>
      {/* Cape */}
      <div className="absolute -left-2 top-4 w-4 h-12 bg-red-500 rounded-l-lg -z-10" />
    </motion.div>
  )
}
