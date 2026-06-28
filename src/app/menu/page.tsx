'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/Card';
import { Cloud } from '@/components/game/Cloud';
import { Play, Trophy, Settings, LayoutDashboard, Info, ListOrdered } from 'lucide-react';

export default function MainMenu() {
  const router = useRouter();

  const menuItems = [
    { label: 'Main Sekarang', icon: Play, path: '/levels', variant: 'secondary' },
    { label: 'Papan Pendahulu', icon: ListOrdered, path: '/leaderboard', variant: 'primary' },
    { label: 'Pencapaian', icon: Trophy, path: '/achievements', variant: 'primary' },
    { label: 'Dashboard Guru', icon: LayoutDashboard, path: '/dashboard', variant: 'primary' },
    { label: 'Tetapan', icon: Settings, path: '/settings', variant: 'primary' },
    { label: 'Cara Bermain', icon: Info, path: '/how-to-play', variant: 'primary' },
  ];

  return (
    <main className="relative w-full h-screen bg-game-sky overflow-hidden flex items-center justify-center p-4">
      <Cloud y="10%" duration={25} />
      <Cloud y="25%" duration={35} delay={5} />
      <Cloud y="60%" duration={30} delay={2} />

      <GlassCard className="w-full max-w-md p-8 relative z-10 flex flex-col gap-6">
        <div className="text-center mb-4">
          <h2 className="text-4xl font-black text-white drop-shadow-lg">Menu Utama</h2>
        </div>

        <div className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant={item.variant as any}
                className="w-full justify-start gap-4"
                size="lg"
                onClick={() => router.push(item.path)}
              >
                <item.icon size={24} />
                {item.label}
              </Button>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Decorative Floor */}
      <div className="absolute bottom-0 w-full h-12 bg-game-grass border-t-4 border-green-600" />
    </main>
  );
}
