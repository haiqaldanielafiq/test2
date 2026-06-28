'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function SplashScreen() {
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-600 p-4">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1.5 }}
        className="mb-8"
      >
        <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_8px_0_rgba(0,0,0,0.3)] text-center">
          MATH<br />QUEST
        </h1>
        <div className="bg-yellow-400 px-4 py-1 rounded-full text-blue-900 font-black text-center mt-4 transform -rotate-2">
          TOPIK: WANG
        </div>
      </motion.div>

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <Button size="lg" variant="secondary" onClick={() => router.push('/menu')}>
              MULAKAN
            </Button>
            <p className="text-white/70 font-medium">Primary 4 Mathematics</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 text-white/50 text-sm font-bold">
        MADE FOR MALAYSIAN STUDENTS
      </div>
    </main>
  );
}
