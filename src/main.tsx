import '@/styles/tailwind.css'

import App from '@/App'

import { LazyMotion, domAnimation } from 'framer-motion'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'react-tippy/dist/tippy.css'

const root = document.getElementById('root') as HTMLElement

createRoot(root).render(
  <BrowserRouter>
    <LazyMotion features={domAnimation}>
      <App />
    </LazyMotion>
  </BrowserRouter>
)
