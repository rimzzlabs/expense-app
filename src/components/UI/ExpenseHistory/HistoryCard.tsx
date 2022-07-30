import { Button, ErrorButton, Tooltip } from '@/components'

import { useEditHistoryModal, useExpenseDetail, usePrompt } from '@/hooks'
import { deleteSingleHistory } from '@/services'
import { formatCurrency, formatDate, twclsx } from '@/utils'

import { ExpenseHistory } from 'expense-app'
import { useCallback } from 'react'
import { HiPencil, HiTrash } from 'react-icons/hi'

const HistoryCard: React.FunctionComponent<ExpenseHistory> = (exp) => {
  const { closePrompt, openPrompt } = usePrompt()
  const { refreshHistoryLists, clearValue } = useExpenseDetail()
  const { openModal } = useEditHistoryModal()

  const handleDelete = useCallback(async () => {
    await deleteSingleHistory(exp.id)
    await refreshHistoryLists()

    clearValue()
    closePrompt()
  }, [exp.id])

  const handleClick = useCallback(() => {
    openPrompt({
      title: `Delete ${exp.source}?`,
      message: `Are you sure you want to delete this history?`,
      onConfirm: handleDelete
    })
  }, [exp.id])

  const handleShowModal = useCallback(() => openModal({ id: exp.id, source: exp.source }), [exp])

  return (
    <div
      key={exp.id}
      className={twclsx(
        'relative',
        'flex flex-col md:flex-row md:justify-between',
        'p-4 pl-6 rounded-lg shadow-md dark:shadow-none',
        'bg-theme-1 dark:bg-theme-7',
        'after:absolute after:left-0 after:inset-y-0',
        'after:w-4',
        exp.type === 'outcome' ? 'after:bg-error-1' : 'after:bg-success-1'
      )}
    >
      <div className='mb-2.5'>
        <h3
          className={twclsx(
            'mb-2',
            exp.type === 'outcome'
              ? 'text-error-2 dark:text-error-1'
              : 'text-success-2 dark:text-success-1'
          )}
        >
          {exp.type === 'outcome' ? '-' : '+'}
          {formatCurrency(exp.amount)}
        </h3>
        <p className='text-sm mb-1'>Source: {exp.source}</p>
        <p className='text-sm'>{formatDate(exp.created_at, 'short')}</p>
      </div>

      <div className={twclsx('inline-flex items-center gap-2.5', 'self-end')}>
        <Tooltip title='Edit this expense history' arrowSize='regular' arrow>
          <Button
            onClick={handleShowModal}
            className={twclsx(
              'w-8 h-8 md:w-10 md:h-10',
              'dark:border-theme-6 hover:bg-theme-2 dark:hover:bg-theme-6'
            )}
          >
            <span className='sr-only'>Edit this history</span>
            <HiPencil />
          </Button>
        </Tooltip>

        <ErrorButton
          onClick={handleClick}
          className={twclsx(
            'w-8 h-8 md:w-10 md:h-10',
            'bg-transparent',
            'text-error-1',
            'hover:bg-error-1/10'
          )}
        >
          <span className='sr-only'>Delete history</span>
          <HiTrash />
        </ErrorButton>
      </div>
    </div>
  )
}

export default HistoryCard
