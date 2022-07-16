import App from './App'
import './styles/tailwind.css'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

const root = document.getElementById('root') as HTMLElement

createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
