import { Variants, m } from 'framer-motion'
import { Outlet } from 'react-router-dom'

export const variants: Variants = {
  hidden: { opacity: 0, y: 25 },
  enter: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.3 } },
  exit: { opacity: 0, y: 0, x: 25, transition: { ease: 'easeIn', duration: 0.25 } }
}

const Layout: React.FunctionComponent = () => {
  return (
    <m.main
      variants={variants}
      initial='hidden'
      animate='enter'
      exit='exit'
      className='layout mt-20'
    >
      <Outlet />
    </m.main>
  )
}

export default Layout
