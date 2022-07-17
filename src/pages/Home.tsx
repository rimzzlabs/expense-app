import { AuthLayer, ButtonLink, ErrorButton } from '@/components'

import { useExpense, useUser } from '@/hooks'
import { formatCurrency, formatDate, twclsx } from '@/utils'

import { HiArrowSmRight, HiTrash } from 'react-icons/hi'
import { Navigate } from 'react-router-dom'

const HomePage: React.FunctionComponent = () => {
  const { user } = useUser()
  const { expenseLists } = useExpense()

  if (!user) {
    return <Navigate to='/signin' replace />
  }

  return (
    <AuthLayer>
      <section className='pt-10'>
        <h1>Welcome back, {user.username}!</h1>
        <p className='mt-4 max-w-prose'>
          ExpenseApp can help you notes your income, outcome and manage your expense more easy.
        </p>
      </section>

      <section className='py-10'>
        <h2 className='mb-2.5'>💰My Expenses</h2>
        <p className='mb-4'>List of your expenses, to view all your expense, go to expense page</p>

        {expenseLists.length > 0 ? (
          <div className={twclsx('grid grid-cols-1 gap-4', 'w-full flex-auto')}>
            {expenseLists.map((expense) => (
              <div
                className={twclsx(
                  'grid grid-cols-2 gap-2',
                  'w-full p-4 rounded-lg shadow-md dark:shadow-none',
                  'bg-theme-1 dark:bg-theme-7'
                )}
                key={expense.id}
              >
                <div className='w-full'>
                  <h3 className='mb-2'>{expense.title}</h3>
                  <p className='mb-4'>{formatDate(expense.created_at)}</p>
                </div>

                <span className='w-full text-xl md:text-4xl font-bold text-right text-success-1'>
                  {formatCurrency(expense.total_money)}
                </span>

                <div
                  className={twclsx(
                    'inline-flex items-center justify-end',
                    'gap-4 w-full col-span-2'
                  )}
                >
                  <ButtonLink
                    to={'/expense/' + expense.id}
                    className={twclsx(
                      'inline-flex items-center gap-1',
                      'py-1.5 px-4 md:py-2.5 md:px-6'
                    )}
                  >
                    <span>View</span>
                    <HiArrowSmRight />
                  </ButtonLink>

                  <ErrorButton className='p-2 md:p-3'>
                    <span className='sr-only'>delete expense</span>
                    <HiTrash />
                  </ErrorButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You don&apos;t have any expense right now, add some?</p>
        )}
      </section>
    </AuthLayer>
  )
}

export default HomePage
