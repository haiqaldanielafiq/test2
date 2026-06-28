'use client';

import { useRouter } from 'next/navigation';
import { useProgressStore } from '@/store/useProgressStore';
import { ACHIEVEMENTS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/Card';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AchievementsPage() {
  const router = useRouter();
  const { achievements } = useProgressStore();

  return (
    <main className="min-h-screen bg-indigo-950 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="glass" size="sm" onClick={() => router.push('/menu')}>
            <ChevronLeft />
          </Button>
          <h1 className="text-4xl font-black text-white">Pencapaian</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map((achievement, index) => {
            const unlocked = achievements.find(a => a.id === achievement.id);

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className={`p-6 flex items-center gap-6 ${!unlocked ? 'opacity-50 grayscale' : ''}`}>
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      {achievement.title}
                      {unlocked && <CheckCircle2 size={18} className="text-green-400" />}
                    </h3>
                    <p className="text-white/70 text-sm">{achievement.description}</p>
                    {unlocked && (
                      <p className="text-[10px] text-green-400 font-bold mt-2 uppercase tracking-widest">
                        Dibuka pada {new Date(unlocked.unlockedAt!).toLocaleDateString()}
                      </p>
                    )}
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
