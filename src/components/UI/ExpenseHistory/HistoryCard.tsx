import { formatCurrency, formatDate, twclsx } from '@/utils'

import { ExpenseHistory } from 'expense-app'

const HistoryCard: React.FunctionComponent<ExpenseHistory> = (exp) => {
  return (
    <div
      key={exp.id}
      className={twclsx(
        'relative',
        'p-4 pl-6 rounded-lg shadow-md dark:shadow-none',
        'bg-theme-1 dark:bg-theme-7',
        'after:absolute after:left-0 after:inset-y-0',
        'after:w-4',
        exp.type === 'outcome' ? 'after:bg-error-1' : 'after:bg-success-1'
      )}
    >
      <h3
        className={twclsx(
          exp.type === 'outcome'
            ? 'text-error-2 dark:text-error-1'
            : 'text-success-2 dark:text-success-1'
        )}
      >
        {exp.type === 'outcome' ? '-' : '+'}
        {formatCurrency(exp.amount)}
      </h3>
      <div className='inline-flex items-center gap-2 mt-2'>
        <p className='text-sm'>{exp.source}/</p>
        <p className='text-sm'>{formatDate(exp.created_at)}</p>
      </div>
    </div>
  )
}

export default HistoryCard
