import { Header, LoadingPage } from '@/components'

import { usePrompt, useTheme } from '@/hooks'
import { Layout } from '@/templates'

import { Suspense, lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import colors from 'tailwindcss/colors'

const Home = lazy(() => import('./pages').then((m) => ({ default: m.Home })))
const Signup = lazy(() => import('./pages').then((m) => ({ default: m.Signup })))
const Signin = lazy(() => import('./pages').then((m) => ({ default: m.Signin })))
const Profile = lazy(() => import('./pages').then((m) => ({ default: m.Profile })))
const Expense = lazy(() => import('./pages').then((m) => ({ default: m.Expense })))
const ExpenseHistory = lazy(() => import('./pages').then((m) => ({ default: m.ExpenseHistory })))

const NotFound = lazy(() => import('./pages').then((m) => ({ default: m.NotFound })))

const ModalPrompt = lazy(() => import('@/components').then((m) => ({ default: m.ModalPrompt })))
const ModalCreateExpense = lazy(() =>
  import('@/components').then((m) => ({ default: m.ModalCreateExpense }))
)
const ModalCreateHistory = lazy(() =>
  import('@/components').then((m) => ({ default: m.ModalCreateHistory }))
)
const ModalEditExpense = lazy(() =>
  import('@/components').then((m) => ({ default: m.EditExpense }))
)

const ExpenseApp: React.FunctionComponent = () => {
  const { theme } = useTheme()
  const { state, closePrompt } = usePrompt()

  return (
    <Suspense fallback={<LoadingPage />}>
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: theme === 'dark' ? colors.neutral[800] : colors.white,
            color: theme === 'dark' ? colors.white : colors.neutral[900]
          }
        }}
      />
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='signup' element={<Signup />} />
          <Route path='signin' element={<Signin />} />
          <Route path='profile' element={<Profile />} />
          <Route path='expense' element={<Expense />} />
          <Route path='expense/:id' element={<ExpenseHistory />} />
        </Route>

        <Route path='/404' element={<NotFound />} />

        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>

      <Suspense fallback={<LoadingPage />}>
        <ModalPrompt {...state} onClose={closePrompt} />
      </Suspense>

      <Suspense fallback={<LoadingPage />}>
        <ModalCreateExpense />
      </Suspense>

      <Suspense fallback={<LoadingPage />}>
        <ModalCreateHistory />
      </Suspense>

      <Suspense fallback={<LoadingPage />}>
        <ModalEditExpense />
      </Suspense>
    </Suspense>
  )
}

export default ExpenseApp
