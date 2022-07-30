import { Loading } from '@/components'

import { cardListVariants } from '@/utils'

import { ExpenseHistory } from 'expense-app'
import { m } from 'framer-motion'
import { Suspense, lazy, memo } from 'react'

type HistoryListsProps = {
  history: ExpenseHistory[]
}

const HistoryCard = lazy(() => import('@/components').then((m) => ({ default: m.HistoryCard })))

const HistoryLists: React.FunctionComponent<HistoryListsProps> = ({ history = [] }) => {
  return (
    <m.div
      variants={cardListVariants}
      initial='hidden'
      animate='enter'
      className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-10'
    >
      <Suspense fallback={<Loading />}>
        {history.map((exp) => (
          <HistoryCard key={exp.id} {...exp} />
        ))}
      </Suspense>
    </m.div>
  )
}

export default memo(HistoryLists)
