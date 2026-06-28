import { motion } from "framer-motion"

export const Castle = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="relative w-64 h-64">
      {/* Main Body */}
      <div className="absolute bottom-0 w-full h-48 bg-gray-400 rounded-t-lg border-b-8 border-gray-600 shadow-2xl" />

      {/* Towers */}
      <div className="absolute bottom-0 -left-8 w-16 h-56 bg-gray-500 rounded-t-lg border-b-8 border-gray-600" />
      <div className="absolute bottom-0 -right-8 w-16 h-56 bg-gray-500 rounded-t-lg border-b-8 border-gray-600" />

      {/* Roofs */}
      <div className="absolute top-4 -left-10 w-20 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[40px] border-b-red-600" />
      <div className="absolute top-4 -right-10 w-20 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[40px] border-b-red-600" />

      {/* Door */}
      <motion.div
        animate={{ height: isOpen ? 0 : 40 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-40 bg-gray-800 rounded-t-full border-x-4 border-t-4 border-gray-900 overflow-hidden"
      >
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full ml-12" />
        </div>
      </motion.div>
    </div>
  )
}
