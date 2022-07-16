import App from './App'
import './styles/tailwind.css'

import { createRoot } from 'react-dom/client'

const root = document.getElementById('root') as HTMLElement

createRoot(root).render(<App />)
