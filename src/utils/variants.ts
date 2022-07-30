import { Variants } from 'framer-motion'

export const cardListVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  enter: { opacity: 1, y: 0, transition: { ease: 'easeOut', delay: 0.2 } }
}
