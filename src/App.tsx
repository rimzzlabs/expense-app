import { Header } from '@/components/UI'

import { Layout } from '@/templates'

import { useTheme } from './hooks'

import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./pages').then((m) => ({ default: m.Home })))
const Signup = lazy(() => import('./pages').then((m) => ({ default: m.Signup })))

const NotFound = lazy(() => import('./pages').then((m) => ({ default: m.NotFound })))

const ExpenseApp: React.FunctionComponent = () => {
  useTheme()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='signup' element={<Signup />} />
        </Route>

        <Route path='/404' element={<NotFound />} />

        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </Suspense>
  )
}

export default ExpenseApp
