import { Header, LoadingPage } from '@/components'

import { usePrompt, useTheme, useUser } from '@/hooks'
import { Layout } from '@/templates'

import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import colors from 'tailwindcss/colors'

const Home = lazy(() => import('./pages').then((m) => ({ default: m.Home })))
const Signup = lazy(() => import('./pages').then((m) => ({ default: m.Signup })))
const Signin = lazy(() => import('./pages').then((m) => ({ default: m.Signin })))
const Profile = lazy(() => import('./pages').then((m) => ({ default: m.Profile })))
const Expense = lazy(() => import('./pages').then((m) => ({ default: m.Expense })))
const ExpenseHistory = lazy(() => import('./pages').then((m) => ({ default: m.ExpenseHistory })))
const PrivacyPolicy = lazy(() => import('./pages').then((m) => ({ default: m.PrivacyPolicy })))
const ForgotPassword = lazy(() => import('./pages').then((m) => ({ default: m.ForgotPassword })))

const NotFound = lazy(() => import('./pages').then((m) => ({ default: m.NotFound })))

const ModalPrompt = lazy(() => import('@/components').then((m) => ({ default: m.ModalPrompt })))
const ModalCreateExpense = lazy(() =>
  import('@/components').then((m) => ({ default: m.CreateExpenseModal }))
)
const ModalCreateHistory = lazy(() =>
  import('@/components').then((m) => ({ default: m.ModalCreateHistory }))
)
const ModalEditExpense = lazy(() =>
  import('@/components').then((m) => ({ default: m.EditExpense }))
)
const ModalEditHistory = lazy(() =>
  import('@/components').then((m) => ({ default: m.ModalEditHistory }))
)
const ModalEditUsername = lazy(() =>
  import('@/components').then((m) => ({ default: m.ModalEditUsername }))
)
const ModalEditEmail = lazy(() =>
  import('@/components').then((m) => ({ default: m.ModalEditEmail }))
)
const ModalStepsUpdateEmail = lazy(() =>
  import('@/components').then((m) => ({ default: m.ModalStepsUpdateEmail }))
)
const ModalEditPassword = lazy(() =>
  import('@/components').then((m) => ({ default: m.ModalEditPassword }))
)

const ExpenseApp: React.FunctionComponent = () => {
  const { theme } = useTheme()
  const { state, closePrompt } = usePrompt()
  const location = useLocation()
  useUser()

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
      <AnimatePresence initial={false} exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='signup' element={<Signup />} />
            <Route path='signin' element={<Signin />} />
            <Route path='profile' element={<Profile />} />
            <Route path='expense' element={<Expense />} />
            <Route path='expense/:id' element={<ExpenseHistory />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          </Route>

          <Route path='forgot-password' element={<ForgotPassword />} />

          <Route path='/404' element={<NotFound />} />

          <Route path='*' element={<Navigate to='/404' />} />
        </Routes>
      </AnimatePresence>

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

      <Suspense fallback={<LoadingPage />}>
        <ModalEditHistory />
      </Suspense>

      <Suspense fallback={<LoadingPage />}>
        <ModalEditUsername />
      </Suspense>

      <Suspense fallback={<LoadingPage />}>
        <ModalEditEmail />
      </Suspense>

      <Suspense fallback={<LoadingPage />}>
        <ModalStepsUpdateEmail />
      </Suspense>

      <Suspense fallback={<LoadingPage />}>
        <ModalEditPassword />
      </Suspense>
    </Suspense>
  )
}

export default ExpenseApp
