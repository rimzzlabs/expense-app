import { ExpenseCard, Image } from '@/components'

import empty_state from '@/assets/empty_expense.svg'
import { useExpense } from '@/hooks'
import { twclsx } from '@/utils'

const ExpenseLists: React.FunctionComponent = () => {
  const { expenseLists } = useExpense()

  if (expenseLists.length > 0) {
    return (
      <div className={twclsx('grid grid-cols-1 sm:grid-cols-2 gap-4 w-full flex-auto')}>
        {expenseLists.map((expense) => (
          <ExpenseCard key={expense.id} {...expense} />
        ))}
      </div>
    )
  }

  return (
    <div
      className={twclsx(
        'flex flex-col items-center justify-center',
        'gap-2 w-full',
        'text-center py-10'
      )}
    >
      <Image src={empty_state} alt='Empty state' className='w-40 h-40' />
      <p className='text-lg md:text-xl font-bold'>You don&apos;t have any expenses</p>
    </div>
  )
}

export default ExpenseLists
