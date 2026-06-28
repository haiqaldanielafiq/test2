import * as React from "react"
import { cn } from "@/lib/utils"

export const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border-4 border-gray-100 dark:border-gray-800", className)}>
    {children}
  </div>
)

export const GlassCard = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl", className)}>
    {children}
  </div>
)
