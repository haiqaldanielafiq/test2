import { motion, AnimatePresence } from "framer-motion"
import { ReactNode } from "react"
import { GlassCard } from "./Card"

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  children: ReactNode
  title?: string
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg"
          >
            <GlassCard className="p-8">
              {title && <h2 className="text-2xl font-black text-white mb-6 text-center">{title}</h2>}
              {children}
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
