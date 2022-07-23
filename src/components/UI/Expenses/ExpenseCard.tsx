import { Button, ButtonLink, ErrorButton, Tooltip } from '@/components'

import { useExpense, usePrompt } from '@/hooks'
import useEditExpense from '@/hooks/useEditExpense'
import { deleteExpense } from '@/services'
import { formatCurrency, formatDate, twclsx } from '@/utils'

import { Expense } from 'expense-app'
import React, { useCallback } from 'react'
import { HiArrowSmRight, HiPencil, HiTrash } from 'react-icons/hi'

const ExpenseCard: React.FunctionComponent<Expense> = (expense) => {
  const { openPrompt, closePrompt } = usePrompt()
  const { refreshExpense } = useExpense()
  const { openExpenseModal } = useEditExpense()

  const expenseDate = formatDate(expense.created_at)
  const expenseTotalMoney = formatCurrency(expense.total_money)
  const expenseURL = '/expense/' + expense.history_id

  const handleDelete = useCallback(async () => {
    await deleteExpense(expense.id, expense.history_id)
    await refreshExpense()
    closePrompt()
  }, [expense.id])

  const showModal = useCallback(
    () => openExpenseModal({ id: expense.id, title: expense.title }),
    [expense]
  )

  const handleDeleteClick = useCallback(
    () =>
      openPrompt({
        title: 'Delete ' + expense.title + '?',
        message: 'Are you sure you want to delete ' + expense.title + '?',
        children: (
          <p
            className={twclsx(
              'font-medium',
              'py-1 px-2 mb-6 mt-4 rounded-lg',
              'bg-error-1 text-theme-1'
            )}
          >
            This will delete <strong>all the history of {expense.title}</strong>
          </p>
        ),
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
        <Tooltip
          title='Edit Expense'
          position='top-start'
          className='mr-auto'
          arrowSize='regular'
          arrow
        >
          <Button
            onClick={showModal}
            className={twclsx(
              'inline-flex items-center justify-center',
              'w-8 md:w-11 h-8 md:h-11 border bg-transparent',
              'dark:border-theme-6 hover:bg-theme-2 dark:hover:bg-theme-5'
            )}
          >
            <span className='sr-only'>Edit expense</span>
            <HiPencil />
          </Button>
        </Tooltip>

        <ButtonLink
          to={{
            pathname: expenseURL
          }}
          state={expense}
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
