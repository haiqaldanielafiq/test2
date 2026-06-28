import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant" | "size"> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "glass"
  size?: "sm" | "md" | "lg" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_4px_0_rgb(30,64,175)] active:translate-y-[2px] active:shadow-none",
      secondary: "bg-green-500 text-white hover:bg-green-600 shadow-[0_4px_0_rgb(21,128,61)] active:translate-y-[2px] active:shadow-none",
      danger: "bg-red-500 text-white hover:bg-red-600 shadow-[0_4px_0_rgb(185,28,28)] active:translate-y-[2px] active:shadow-none",
      ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
      glass: "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30",
    }

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-6 py-3 text-base font-bold",
      lg: "px-8 py-4 text-lg font-black",
      icon: "p-3 rounded-full",
    }

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
