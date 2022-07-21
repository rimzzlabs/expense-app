import { HistoryCard } from '@/components'

import { ExpenseHistory } from 'expense-app'

type HistoryListsProps = {
  history: ExpenseHistory[]
}

const HistoryLists: React.FunctionComponent<HistoryListsProps> = ({ history }) => {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {history.map((exp) => (
        <HistoryCard key={exp.id} {...exp} />
      ))}
    </section>
  )
}

export default HistoryLists
