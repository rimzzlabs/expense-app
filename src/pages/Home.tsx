import { AuthLayer, Image, Loading } from '@/components'

import empty_state from '@/assets/empty_expense.svg'
import { useExpense, useUser } from '@/hooks'
import { cardListVariants, twclsx } from '@/utils'

import { m } from 'framer-motion'
import { Suspense, lazy, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const ExpenseLists = lazy(() => import('@/components').then((m) => ({ default: m.ExpenseLists })))

const HomePage: React.FunctionComponent = () => {
  const user = useUser()
  const { expenseLists, refreshExpense } = useExpense()

  useEffect(() => {
    if (!user) return
    ;(async () => await refreshExpense())()
  }, [])

  if (!user) return <Navigate to='/signin' replace />

  return (
    <AuthLayer>
      <section className='pt-10'>
        <h1>Welcome back, {user?.username ?? user?.name?.replaceAll(' ', '')}!</h1>
        <p className='mt-4 max-w-prose'>
          ExpenseApp can help you notes your income, outcome and manage your expense more easy.
        </p>
      </section>

      <section className='py-10'>
        <h2 className='mb-2.5'>💰My Expenses</h2>
        <p>List of your expenses, to view all your expense, go to expense page</p>

        <Suspense fallback={<Loading />}>
          <ExpenseLists expenseLists={expenseLists.slice(0, 4)} />
        </Suspense>

        {expenseLists.length === 0 && (
          <m.div
            variants={cardListVariants}
            initial='hidden'
            animate='enter'
            className={twclsx(
              'flex flex-col items-center justify-center',
              'gap-2 w-full',
              'text-center py-10'
            )}
          >
            <Image src={empty_state} alt='Empty state' className='w-40 h-40' />
            <p className='text-lg md:text-xl font-bold'>You don&apos;t have any expenses</p>
          </m.div>
        )}
      </section>
    </AuthLayer>
  )
}

export default HomePage
