import { motion } from 'framer-motion'

/**
 * Scroll-triggered reveal. Wrap anything.
 * Everything on the site rises on the same curve, at the same speed —
 * that consistency is what reads as "calm" rather than "animated".
 */
export default function Reveal({ children, delay = 0, y = 18, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
