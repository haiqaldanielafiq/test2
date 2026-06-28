import { motion } from "framer-motion"
import { Heart, Coins, Timer } from "lucide-react"
import { GlassCard } from "@/components/ui/Card"
import { Progress } from "@/components/ui/Progress"
import { useGameStore } from "@/store/useGameStore"
import { GAME_TIMER_SECONDS } from "@/lib/constants"

export const HUD = () => {
  const { hearts, coins, score, timeLeft, currentLevel } = useGameStore()

  return (
    <div className="fixed top-0 left-0 right-0 p-4 z-40 flex justify-between items-start gap-4">
      <div className="flex gap-3">
        <GlassCard className="px-4 py-2 flex items-center gap-2 shadow-xl border-white/40">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={i < hearts ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              >
                <Heart
                  className={i < hearts ? "text-red-500 fill-red-500" : "text-white/20"}
                  size={20}
                />
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="px-4 py-2 flex items-center gap-2 text-yellow-300 font-black shadow-xl border-white/40">
          <Coins size={20} className="drop-shadow-md" />
          <span className="text-lg">{coins}</span>
        </GlassCard>
      </div>

      <GlassCard className="px-8 py-2 text-center shadow-2xl border-white/50 bg-white/30 backdrop-blur-xl">
        <div className="text-[10px] text-white/80 uppercase font-black tracking-[0.2em] mb-0.5">LEVEL {currentLevel}</div>
        <div className="text-3xl text-white font-black drop-shadow-lg tabular-nums">
          {score.toLocaleString()}
        </div>
      </GlassCard>

      <div className="flex flex-col items-end gap-2">
        <GlassCard className="px-4 py-2 flex items-center gap-2 text-blue-100 font-black shadow-xl border-white/40">
          <Timer size={20} className="drop-shadow-md" />
          <span className="text-lg tabular-nums">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </GlassCard>
        <div className="w-32 shadow-lg rounded-full overflow-hidden border border-white/20">
          <Progress value={timeLeft} max={GAME_TIMER_SECONDS} color="bg-blue-400" />
        </div>
      </div>
    </div>
  )
}
