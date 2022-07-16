import { Layout } from '@/templates'

import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./pages').then((m) => ({ default: m.Home })))

const ExpenseApp: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default ExpenseApp
