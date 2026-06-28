import { motion } from "framer-motion"
import { HelpCircle } from "lucide-react"

export const QuestionBlock = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="w-20 h-20 bg-yellow-500 rounded-xl flex items-center justify-center shadow-[0_8px_0_rgb(161,98,7)] border-4 border-yellow-300 relative group"
    >
      <HelpCircle className="w-10 h-10 text-white" />
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-4 w-2 h-2 bg-white/50 rounded-full"
      />
    </motion.button>
  )
}
