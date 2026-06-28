import { motion } from "framer-motion"

export const Cloud = ({ duration = 20, delay = 0, y = "10%" }: { duration?: number, delay?: number, y?: string }) => {
  return (
    <motion.div
      initial={{ x: "-20%" }}
      animate={{ x: "120%" }}
      transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
      style={{ top: y }}
      className="absolute z-0"
    >
      <div className="relative w-32 h-12 bg-white rounded-full shadow-lg opacity-80">
        <div className="absolute -top-6 left-6 w-16 h-16 bg-white rounded-full" />
        <div className="absolute -top-4 right-6 w-12 h-12 bg-white rounded-full" />
      </div>
    </motion.div>
  )
}
