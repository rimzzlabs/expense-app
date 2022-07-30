import { AuthLayer, Input, Loading, PrimaryButton } from '@/components'

import { useCreateExpenseModal, useExpense } from '@/hooks'

import { Suspense, lazy, useEffect } from 'react'
import { HiOutlineSearch, HiPlus } from 'react-icons/hi'

const ExpenseLists = lazy(() => import('@/components').then((m) => ({ default: m.ExpenseLists })))

const ExpensePage: React.FunctionComponent = () => {
  const { openModal } = useCreateExpenseModal()
  const exp = useExpense()

  useEffect(() => {
    ;(async () => await exp.refreshExpense())()
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

      <div className='my-4 md:my-8'>
        <div className='relative'>
          <Input
            type='text'
            className='peer w-full md:h-12 pr-8 border-none focus:ring-0'
            placeholder='Search Expense..'
            value={exp.searchQuery}
            onChange={exp.handleSearch}
          />

          <HiOutlineSearch className='absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 opacity-30 peer-focus:opacity-100' />
        </div>
      </div>

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
            <p>No Expense Found</p>
          )}
        </section>
      ) : null}
    </AuthLayer>
  )
}

export default ExpensePage
