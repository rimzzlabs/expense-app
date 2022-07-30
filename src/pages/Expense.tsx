import { AuthLayer, Loading, PrimaryButton, Searchbar } from '@/components'

import { useCreateExpenseModal, useExpense } from '@/hooks'

import { Suspense, lazy, useEffect } from 'react'
import { HiPlus } from 'react-icons/hi'

const ExpenseLists = lazy(() => import('@/components').then((m) => ({ default: m.ExpenseLists })))

const ExpensePage: React.FunctionComponent = () => {
  const { openModal } = useCreateExpenseModal()
  const exp = useExpense()

  console.info(exp)

  useEffect(() => {
    ;(async () => await exp.refreshExpense())()
  }, [])

  return (
    <AuthLayer>
      <div className='inline-flex justify-between pt-10 w-full gap-4'>
        <section>
          <h1 className='mb-2.5'>Expenses💰</h1>
          <p>List of your expense, you can create, modify or delete your expense here.</p>
        </section>

        <PrimaryButton onClick={openModal} className='py-2 px-3 h-max md:py-2.5 md:px-4'>
          <HiPlus />
          <span>Create</span>
        </PrimaryButton>
      </div>

      <Searchbar placeholder='Search expense' value={exp.searchQuery} onChange={exp.handleSearch} />

      {exp.expenseLists.length > 0 && exp.searchQuery.length === 0 ? (
        <section className='pt-10'>
          <h2>My Expense</h2>
          <Suspense fallback={<Loading />}>
            <ExpenseLists expenseLists={exp.expenseLists} />
          </Suspense>
        </section>
      ) : null}

      {exp.searchQuery.length > 0 ? (
        <section className='pt-10'>
          <h2>Search Expense</h2>
          {exp.filteredExpenseLists.length > 0 ? (
            <Suspense fallback={<Loading />}>
              <ExpenseLists expenseLists={exp.filteredExpenseLists} />
            </Suspense>
          ) : (
            <p className='text-xl md:text-2xl font-bold text-center py-10 text-theme-6 dark:text-theme-4'>
              No Expense Found
            </p>
          )}
        </section>
      ) : null}
    </AuthLayer>
  )
}

export default ExpensePage
