'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useProgressStore } from '@/store/useProgressStore';
import { LEVELS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/Card';
import { Lock, Star, ChevronLeft } from 'lucide-react';
import { Cloud } from '@/components/game/Cloud';

export default function LevelSelection() {
  const router = useRouter();
  const { unlockedLevels, highScores } = useProgressStore();

  return (
    <main className="relative w-full h-screen bg-game-sky p-6 overflow-y-auto">
      <Cloud y="5%" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="glass" size="sm" onClick={() => router.push('/menu')}>
            <ChevronLeft />
          </Button>
          <h1 className="text-4xl font-black text-white">Pilih Tahap</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEVELS.map((level) => {
            const isUnlocked = unlockedLevels.includes(level.id);
            const highScore = highScores[level.id] || 0;
            const stars = highScore >= 100 ? 3 : highScore >= 80 ? 2 : highScore >= 50 ? 1 : 0;

            return (
              <motion.div
                key={level.id}
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
              >
                <GlassCard
                  className={`p-6 h-full flex flex-col justify-between relative ${!isUnlocked && 'opacity-60 grayscale'}`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-white/30 px-3 py-1 rounded-full text-xs font-black text-white">
                        LEVEL {level.id}
                      </span>
                      {!isUnlocked && <Lock className="text-white" size={20} />}
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">{level.title}</h3>
                    <p className="text-white/80 text-sm font-medium mb-4">{level.description}</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < stars ? "text-yellow-400 fill-yellow-400" : "text-white/20"}
                        />
                      ))}
                    </div>
                    <Button
                      variant={isUnlocked ? "secondary" : "glass"}
                      disabled={!isUnlocked}
                      onClick={() => router.push(`/game/${level.id}`)}
                      className="w-full"
                    >
                      {isUnlocked ? "MULA" : "DIKUNCI"}
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
