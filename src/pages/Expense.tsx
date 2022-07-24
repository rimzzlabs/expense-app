import { AuthLayer, Loading, PrimaryButton } from '@/components'

import { useCreateExpenseModal, useExpense } from '@/hooks'

import { Suspense, lazy, useEffect } from 'react'
import { HiPlus } from 'react-icons/hi'

const ExpenseLists = lazy(() => import('@/components').then((m) => ({ default: m.ExpenseLists })))

const ExpensePage: React.FunctionComponent = () => {
  const { openModal } = useCreateExpenseModal()
  const { expenseLists, refreshExpense } = useExpense()

  useEffect(() => {
    ;(async () => await refreshExpense())()
  }, [])

  return (
    <AuthLayer>
      <div className='inline-flex justify-between pt-10 w-full gap-4'>
        <section>
          <h1>Expenses💰</h1>
          <p>List of your expense, you can create, modify or delete your expense here.</p>
        </section>

        <PrimaryButton onClick={openModal} className='py-2 px-3 h-max md:py-2.5 md:px-4'>
          <HiPlus />
          <span>Create</span>
        </PrimaryButton>
      </div>

      <section className='pt-10'>
        <h2>My Expense</h2>
        <Suspense fallback={<Loading />}>
          <ExpenseLists expenseLists={expenseLists} />
        </Suspense>
      </section>
    </AuthLayer>
  )
}

export default ExpensePage
