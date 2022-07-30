import { ExpenseCard } from '@/components'

import { cardListVariants, twclsx } from '@/utils'

import { Expense } from 'expense-app'
import { m } from 'framer-motion'
import { memo } from 'react'

type ExpenseListsProps = {
  expenseLists: Expense[]
}

const ExpenseLists: React.FunctionComponent<ExpenseListsProps> = ({ expenseLists = [] }) => {
  return (
    <m.div
      variants={cardListVariants}
      initial='hidden'
      animate='enter'
      className={twclsx('grid grid-cols-1 sm:grid-cols-2 gap-4 w-full flex-auto', 'py-10')}
    >
      {expenseLists.map((expense) => (
        <ExpenseCard key={expense.id} {...expense} />
      ))}
    </m.div>
  )
}

export default memo(ExpenseLists)
