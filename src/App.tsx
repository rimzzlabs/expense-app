import { Header, LoadingPage } from '@/components/UI'

import { useTheme } from '@/hooks'
import { Layout } from '@/templates'

import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./pages').then((m) => ({ default: m.Home })))
const Signup = lazy(() => import('./pages').then((m) => ({ default: m.Signup })))
const Signin = lazy(() => import('./pages').then((m) => ({ default: m.Signin })))
const Profile = lazy(() => import('./pages').then((m) => ({ default: m.Profile })))

const NotFound = lazy(() => import('./pages').then((m) => ({ default: m.NotFound })))

const ExpenseApp: React.FunctionComponent = () => {
  useTheme()
  return (
    <Suspense fallback={<LoadingPage />}>
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='signup' element={<Signup />} />
          <Route path='signin' element={<Signin />} />
          <Route path='profile' element={<Profile />} />
        </Route>

        <Route path='/404' element={<NotFound />} />

        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </Suspense>
  )
}

export default ExpenseApp
