import '@/styles/tailwind.css'

import App from '@/App'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

const root = document.getElementById('root') as HTMLElement

createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
