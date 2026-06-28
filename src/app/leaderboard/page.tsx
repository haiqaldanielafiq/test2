'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Trophy, Medal, Star, ArrowLeft } from 'lucide-react';
import { useProgressStore } from '@/store/useProgressStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface PlayerData {
    name: string;
    score: number;
    level: number;
    isPlayer?: boolean;
}

const MOCK_LEADERBOARD: PlayerData[] = [
  { name: 'Ahmad', score: 2450, level: 5 },
  { name: 'Siti', score: 2320, level: 5 },
  { name: 'Wong', score: 2100, level: 4 },
  { name: 'Muthu', score: 1980, level: 4 },
  { name: 'Sarah', score: 1850, level: 3 },
];

export default function LeaderboardPage() {
  const router = useRouter();
  const { totalCoins, highScores, unlockedLevels } = useProgressStore();

  const totalScore = Object.values(highScores).reduce((sum, score) => sum + score, 0);

  // Combine mock data with player data
  const players: PlayerData[] = [
    ...MOCK_LEADERBOARD,
    { name: 'Anda (Pemain)', score: totalScore, level: unlockedLevels.length, isPlayer: true }
  ].sort((a, b) => b.score - a.score);

  return (
    <main className="min-h-screen bg-game-sky p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="glass" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </Button>
          <h1 className="text-4xl font-black text-white drop-shadow-lg">PAPAN PENDAHULU</h1>
        </div>

        <Card className="bg-white/20 backdrop-blur-md border-white/30 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-around mb-8">
                <div className="text-center">
                    <Medal className="w-10 h-10 text-yellow-400 mx-auto" />
                    <p className="text-white font-bold mt-2">{totalScore}</p>
                    <p className="text-white/70 text-xs">JUMLAH MATA</p>
                </div>
                <div className="text-center">
                    <Star className="w-10 h-10 text-orange-400 mx-auto" />
                    <p className="text-white font-bold mt-2">{totalCoins}</p>
                    <p className="text-white/70 text-xs">SYILING</p>
                </div>
            </div>

            <div className="space-y-3">
              {players.map((p, index) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    p.isPlayer ? 'bg-yellow-400/30 border-2 border-yellow-400' : 'bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 text-2xl font-black text-white/50">#{index + 1}</span>
                    <div>
                      <p className="font-bold text-white text-lg">{p.name}</p>
                      <p className="text-white/60 text-sm">Level {p.level} Selesai</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-white">{p.score}</p>
                    <p className="text-white/40 text-[10px]">MATA</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
