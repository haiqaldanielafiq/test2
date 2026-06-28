'use client';

import { useRouter } from 'next/navigation';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useProgressStore } from '@/store/useProgressStore';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/Card';
import { ChevronLeft, Volume2, Moon, Sun, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const {
    musicVolume, sfxVolume, darkMode,
    updateSettings
  } = useSettingsStore();
  const { resetProgress } = useProgressStore();

  return (
    <main className={`min-h-screen p-6 overflow-y-auto ${darkMode ? 'bg-slate-900 text-white' : 'bg-blue-50 text-slate-900'}`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.push('/menu')}>
            <ChevronLeft />
          </Button>
          <h1 className="text-3xl font-black text-white">Tetapan</h1>
        </div>

        <div className="flex flex-col gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Volume2 className="text-blue-500" />
              <h3 className="text-lg font-bold">Audio</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Muzik Latar</label>
                <input
                  type="range"
                  min="0" max="1" step="0.1"
                  value={musicVolume}
                  onChange={(e) => updateSettings({ musicVolume: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Kesan Bunyi (SFX)</label>
                <input
                  type="range"
                  min="0" max="1" step="0.1"
                  value={sfxVolume}
                  onChange={(e) => updateSettings({ sfxVolume: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4 mb-6">
              {darkMode ? <Moon className="text-yellow-400" /> : <Sun className="text-orange-500" />}
              <h3 className="text-lg font-bold">Paparan</h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Mod Gelap</span>
              <button
                onClick={() => updateSettings({ darkMode: !darkMode })}
                className={`w-14 h-8 rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform transform ${darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
             <div className="flex items-center gap-4 mb-6 text-red-500">
              <Trash2 />
              <h3 className="text-lg font-bold">Data</h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Padam Kemajuan</p>
                <p className="text-xs opacity-70">Semua skor dan level akan dipadamkan.</p>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  if(confirm("Adakah anda pasti?")) resetProgress();
                }}
              >
                PADAM
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
