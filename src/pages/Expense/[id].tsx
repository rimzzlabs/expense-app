import { AuthLayer, Image, Loading, LoadingPage, PrimaryButton } from '@/components'

import empty_history from '@/assets/empty_history.svg'
import { useExpenseDetail, useExpenseHistory } from '@/hooks'
import { formatCurrency, formatDate, twclsx } from '@/utils'

import { Suspense, lazy } from 'react'
import { HiCalendar, HiCash, HiCreditCard, HiPlus } from 'react-icons/hi'

const HistoryLists = lazy(() => import('@/components').then((m) => ({ default: m.HistoyLists })))

const ExpenseHistory: React.FunctionComponent = () => {
  const { expense } = useExpenseDetail()
  const { expenseHistory } = useExpenseHistory()

  return (
    <AuthLayer>
      {!expense && <LoadingPage />}

      {expense && (
        <>
          <section className={twclsx('pt-10')}>
            <h1>Expense History</h1>
            <div className='flex items-center gap-4 mt-4'>
              <div
                className={twclsx(
                  'inline-flex items-center gap-2',
                  'p-1 px-2 border rounded-lg font-medium',
                  'text-theme-5 dark:text-theme-3 border-theme-3 dark:border-theme-6'
                )}
              >
                <HiCalendar />
                <span>{formatDate(expense.created_at)}</span>
              </div>
              <div
                className={twclsx(
                  'inline-flex items-center gap-2',
                  'p-1 px-2 border rounded-lg font-medium',
                  'text-theme-5 dark:text-theme-3 border-theme-3 dark:border-theme-6'
                )}
              >
                <HiCash />
                <span>{formatCurrency(expense.total_money)}</span>
              </div>
            </div>
          </section>

          <section className='pt-10'>
            <div className={twclsx('flex items-center justify-between', 'w-full')}>
              <h2 className='inline-flex items-center gap-1'>
                <HiCreditCard />
                <span>{expense.title}</span>
              </h2>

              <PrimaryButton className={twclsx('py-2 px-2 md:px-4', 'gap-2')}>
                <HiPlus />
                <span className='hidden md:block'>Create</span>
              </PrimaryButton>
            </div>

            <div className='mt-4'>
              {expenseHistory && expenseHistory.length > 0 ? (
                <Suspense fallback={<Loading />}>
                  <HistoryLists history={expenseHistory} />
                </Suspense>
              ) : (
                <div
                  className={twclsx(
                    'flex flex-col items-center justify-center',
                    'gap-2 text-center w-full py-10'
                  )}
                >
                  <Image src={empty_history} alt='No history' className='w-40 h-40' />
                  <p className='text-lg md:text-xl font-bold'>
                    There&apos;s nothing to show here, add some history!
                  </p>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </AuthLayer>
  )
}

export default ExpenseHistory
