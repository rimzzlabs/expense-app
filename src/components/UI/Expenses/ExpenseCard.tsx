import { ButtonLink, ErrorButton } from '@/components'

import { useExpense, usePrompt } from '@/hooks'
import { deleteExpense } from '@/services'
import { formatCurrency, formatDate, twclsx } from '@/utils'

import { Expense } from 'expense-app'
import { useCallback } from 'react'
import { HiArrowSmRight, HiTrash } from 'react-icons/hi'

const ExpenseCard: React.FunctionComponent<Expense> = (expense) => {
  const { openPrompt, closePrompt } = usePrompt()
  const { refreshExpense } = useExpense()
  const expenseDate = formatDate(expense.created_at)
  const expenseTotalMoney = formatCurrency(expense.total_money)
  const expenseURL = '/expense/' + expense.id

  const handleDelete = useCallback(async () => {
    await deleteExpense(expense.id)
    await refreshExpense()
    closePrompt()
  }, [expense.id])

  const handleDeleteClick = useCallback(
    () =>
      openPrompt({
        title: 'Delete ' + expense.title + '?',
        message: 'Are you sure you want to delete ' + expense.title + '?',
        onConfirm: handleDelete
      }),
    [expense.id]
  )

  return (
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
        <p className='mb-4'>{expenseDate}</p>
      </div>

      <span className='w-full text-xl md:text-4xl font-bold text-right text-success-1'>
        {expenseTotalMoney}
      </span>

      <div className={twclsx('inline-flex items-center justify-end', 'gap-4 w-full col-span-2')}>
        <ButtonLink
          state={expense}
          to={expenseURL}
          className={twclsx('inline-flex items-center gap-1', 'py-1.5 px-4 md:py-2.5 md:px-6')}
        >
          <span>View</span>
          <HiArrowSmRight />
        </ButtonLink>

        <ErrorButton onClick={handleDeleteClick} className='p-2 md:p-3'>
          <span className='sr-only'>delete expense</span>
          <HiTrash />
        </ErrorButton>
      </div>
    </div>
  )
}

export default ExpenseCard
