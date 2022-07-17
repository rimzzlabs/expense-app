import { ExpenseCard } from '@/components'

import { useExpense } from '@/hooks'

const ExpenseLists: React.FunctionComponent = () => {
  const { expenseLists } = useExpense()

  if (expenseLists.length > 0) {
    return (
      <div className='grid grid-cols-1 gap-4 w-full flex-auto'>
        {expenseLists.map((expense) => (
          <ExpenseCard key={expense.id} {...expense} />
        ))}
      </div>
    )
  }

  return <p>You don&apos;t have any expense.</p>
}

export default ExpenseLists
