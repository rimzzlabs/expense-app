import { AuthLayer, Image, Loading, PrimaryButton, Searchbar } from '@/components'

import empty_state from '@/assets/empty_expense.svg'
import { useCreateExpenseModal, useExpense } from '@/hooks'
import { cardListVariants, twclsx } from '@/utils'

import { m } from 'framer-motion'
import { Suspense, lazy, useEffect } from 'react'
import { HiPlus } from 'react-icons/hi'

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
          <h1 className='mb-2.5'>Expenses💰</h1>
          <p>List of your expense, you can create, modify or delete your expense here.</p>
        </section>

        <PrimaryButton onClick={openModal} className='py-2 px-3 h-max md:py-2.5 md:px-4'>
          <HiPlus />
          <span>Create</span>
        </PrimaryButton>
      </div>

      <Searchbar
        disabled={exp.expenseLists.length === 0}
        placeholder='Search expense'
        value={exp.searchQuery}
        onChange={exp.handleSearch}
      />

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
          {exp.filteredExpenseLists.length > 0 && (
            <Suspense fallback={<Loading />}>
              <ExpenseLists expenseLists={exp.filteredExpenseLists} />
            </Suspense>
          )}
          {exp.expenseLists.length > 0 && exp.filteredExpenseLists.length === 0 && (
            <p className='text-xl md:text-2xl font-bold text-center py-10 text-theme-6 dark:text-theme-4'>
              No Expense Found
            </p>
          )}
        </section>
      ) : null}

      {exp.expenseLists.length === 0 && (
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
    </AuthLayer>
  )
}

export default ExpensePage
