import { Image, Loading } from '@/components'

import empty_history from '@/assets/empty_history.svg'
import { twclsx } from '@/utils'

import { ExpenseHistory } from 'expense-app'
import { Variants, m } from 'framer-motion'
import { Suspense, lazy, memo } from 'react'

type HistoryListsProps = {
  history: ExpenseHistory[]
}

const variants: Variants = {
  hidden: { opacity: 0, y: 25 },
  enter: { opacity: 1, y: 0, transition: { ease: 'easeOut', delay: 0.2 } }
}

const HistoryCard = lazy(() => import('@/components').then((m) => ({ default: m.HistoryCard })))

const HistoryLists: React.FunctionComponent<HistoryListsProps> = ({ history = [] }) => {
  if (history.length > 0) {
    return (
      <m.div
        variants={variants}
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

  return (
    <m.div
      variants={variants}
      initial='hidden'
      animate='enter'
      className={twclsx(
        'flex flex-col items-center justify-center',
        'gap-2 text-center w-full py-10'
      )}
    >
      <Image src={empty_history} alt='No history' className='w-40 h-40' />
      <p className='text-lg md:text-xl font-bold'>
        There&apos;s nothing to show here, add some history!
      </p>
    </m.div>
  )
}

export default memo(HistoryLists)
