import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressProps {
  value: number
  max: number
  color?: string
  className?: string
}

export const Progress = ({ value, max, color = "bg-green-500", className }: ProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={cn("w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn("h-full", color)}
      />
    </div>
  )
}
