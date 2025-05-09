import { motion } from "framer-motion"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`
        relative
        bg-white/5
        backdrop-blur-lg
        border
        border-white/10
        rounded-2xl
        p-6
        shadow-xl
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
