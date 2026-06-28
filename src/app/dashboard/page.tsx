'use client';

import { useProgressStore } from '@/store/useProgressStore';
import { GlassCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { ChevronLeft, BarChart2, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TeacherDashboard() {
  const router = useRouter();
  const { highScores, totalCoins, mistakesByTopic, unlockedLevels } = useProgressStore();

  const scoreData = Object.entries(highScores).map(([level, score]) => ({
    name: `Lvl ${level}`,
    score
  }));

  const mistakeData = Object.entries(mistakesByTopic).map(([topic, count]) => ({
    topic,
    count
  }));

  return (
    <main className="min-h-screen bg-slate-900 p-6 overflow-y-auto text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="glass" size="sm" onClick={() => router.push('/menu')}>
              <ChevronLeft />
            </Button>
            <h1 className="text-3xl font-black">Dashboard Statistik</h1>
          </div>
          <Button variant="glass" onClick={() => {
             const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({highScores, mistakesByTopic}));
             const downloadAnchorNode = document.createElement('a');
             downloadAnchorNode.setAttribute("href",     dataStr);
             downloadAnchorNode.setAttribute("download", "student_progress.json");
             document.body.appendChild(downloadAnchorNode);
             downloadAnchorNode.click();
             downloadAnchorNode.remove();
          }}>EXPORT JSON</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <GlassCard className="p-6 bg-blue-500/20">
            <div className="text-blue-400 mb-2"><BarChart2 size={24} /></div>
            <div className="text-2xl font-black">{Object.keys(highScores).length}</div>
            <div className="text-sm text-slate-400">Tahap Selesai</div>
          </GlassCard>
          <GlassCard className="p-6 bg-yellow-500/20">
            <div className="text-yellow-400 mb-2"><CheckCircle size={24} /></div>
            <div className="text-2xl font-black">{totalCoins}</div>
            <div className="text-sm text-slate-400">Jumlah Syiling</div>
          </GlassCard>
          <GlassCard className="p-6 bg-red-500/20">
            <div className="text-red-400 mb-2"><AlertCircle size={24} /></div>
            <div className="text-2xl font-black">{Object.values(mistakesByTopic).reduce((a, b) => (a as number) + (b as number), 0)}</div>
            <div className="text-sm text-slate-400">Jumlah Kesilapan</div>
          </GlassCard>
          <GlassCard className="p-6 bg-green-500/20">
            <div className="text-green-400 mb-2"><Clock size={24} /></div>
            <div className="text-2xl font-black">{unlockedLevels.length} / 5</div>
            <div className="text-sm text-slate-400">Kemajuan Level</div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassCard className="p-8 h-[400px]">
            <h3 className="text-xl font-bold mb-6">Prestasi Skor</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="text-xl font-bold mb-6">Analisis Kesilapan</h3>
            {mistakeData.length > 0 ? (
               <div className="space-y-4">
                 {mistakeData.map((item) => (
                   <div key={item.topic} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{item.topic}</span>
                          <span className="text-red-400">{item.count} salah</span>
                        </div>
                        <div className="w-full bg-slate-700 h-2 rounded-full">
                          <div
                            className="bg-red-500 h-full rounded-full"
                            style={{ width: `${Math.min(item.count * 10, 100)}%` }}
                          />
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">
                Tiada data kesilapan direkodkan.
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
