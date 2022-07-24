import { ExpenseCard, Image } from '@/components'

import empty_state from '@/assets/empty_expense.svg'
import { twclsx } from '@/utils'

import { Expense } from 'expense-app'
import { Variants, m } from 'framer-motion'
import { memo } from 'react'

type ExpenseListsProps = {
  expenseLists: Expense[]
}

const variants: Variants = {
  hidden: { opacity: 0, y: 25 },
  enter: { opacity: 1, y: 0, transition: { ease: 'easeOut', delay: 0.2 } }
}

const ExpenseLists: React.FunctionComponent<ExpenseListsProps> = ({ expenseLists = [] }) => {
  if (expenseLists.length > 0) {
    return (
      <m.div
        variants={variants}
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

  return (
    <m.div
      variants={variants}
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
  )
}

export default memo(ExpenseLists)
