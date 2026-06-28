'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/Card';
import { ChevronLeft, ArrowRight, MousePointer2, Keyboard } from 'lucide-react';
import { Cloud } from '@/components/game/Cloud';

export default function HowToPlay() {
  const router = useRouter();

  const steps = [
    {
      title: "Pilih Tahap",
      desc: "Mulakan dengan Level 1 untuk belajar asas nilai wang.",
      icon: <ArrowRight className="text-blue-400" />
    },
    {
      title: "Teroka Dunia",
      desc: "Gunakan klik atau sentuhan untuk menggerakkan pemain.",
      icon: <MousePointer2 className="text-yellow-400" />
    },
    {
      title: "Jawab Soalan",
      desc: "Sentuh blok soalan dan pilih jawapan yang betul untuk kumpul syiling.",
      icon: <Keyboard className="text-green-400" />
    },
    {
      title: "Menang!",
      desc: "Habiskan semua soalan untuk membuka pintu istana dan menang!",
      icon: <span className="text-2xl">🏰</span>
    }
  ];

  return (
    <main className="min-h-screen bg-game-sky p-6 overflow-y-auto flex items-center justify-center">
      <Cloud y="10%" />
      <div className="max-w-2xl w-full relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="glass" size="sm" onClick={() => router.push('/menu')}>
            <ChevronLeft />
          </Button>
          <h1 className="text-4xl font-black text-white">Cara Bermain</h1>
        </div>

        <GlassCard className="p-8">
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-white/70 font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            className="w-full mt-10"
            variant="secondary"
            size="lg"
            onClick={() => router.push('/levels')}
          >
            FAHAM, JOM MAIN!
          </Button>
        </GlassCard>
      </div>
    </main>
  );
}
