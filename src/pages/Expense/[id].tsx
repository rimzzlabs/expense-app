import { AuthLayer, Image, Loading, LoadingPage, PrimaryButton } from '@/components'

import empty_history from '@/assets/empty_history.svg'
import { useExpenseHistory } from '@/hooks'
import * as atoms from '@/store'
import { formatCurrency, formatDate, twclsx } from '@/utils'

import { useAtom } from 'jotai'
import { Suspense, lazy, useEffect } from 'react'
import { HiCalendar, HiCash, HiCreditCard, HiPlus } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router-dom'

const HistoryLists = lazy(() => import('@/components').then((m) => ({ default: m.HistoyLists })))

const ExpenseHistory: React.FunctionComponent = () => {
  const param = useParams()
  const navigate = useNavigate()

  const [expenseLists] = useAtom(atoms.expenseListsAtom)
  const [expense, setExpenseDetail] = useAtom(atoms.expenseAtom)

  const { expenseHistory, openModal } = useExpenseHistory()

  useEffect(() => {
    const filteredExpense = expenseLists.filter((e) => e.history_id === param.id)[0]

    if (!filteredExpense) {
      navigate('/')
      return
    }

    const totalIncome = expenseHistory
      ?.filter((e) => e.type === 'income')
      .reduce((acc, cur) => acc + cur.amount, 0)
    const totalOutcome = expenseHistory
      ?.filter((e) => e.type === 'outcome')
      .reduce((acc, cur) => acc + cur.amount, 0)

    setExpenseDetail({
      ...filteredExpense,
      totalIncome,
      totalOutcome,
      currentMoney: filteredExpense.total_money + totalIncome - totalOutcome
    })
  }, [expenseLists, expenseHistory])

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
              <div className='inline-flex flex-col gap-4'>
                <h2 className='inline-flex items-center gap-2'>
                  <HiCreditCard />
                  <span>{expense.title}</span>
                </h2>

                <div className={twclsx('inline-flex flex-col gap-2')}>
                  <p>
                    Curently have:{' '}
                    <span className='font-semibold text-success-1'>
                      {formatCurrency(expense.currentMoney ?? 0)}
                    </span>
                  </p>

                  <p>
                    Money earned:{' '}
                    <span className='font-semibold text-success-1'>
                      {formatCurrency(expense.totalIncome ?? 0)}
                    </span>
                  </p>

                  <p>
                    Money spended:{' '}
                    <span className='font-semibold text-warning-1'>
                      {formatCurrency(expense.totalOutcome ?? 0)}
                    </span>
                  </p>
                </div>
              </div>

              <PrimaryButton onClick={openModal} className={twclsx('py-2 px-2 md:px-4', 'gap-2')}>
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
