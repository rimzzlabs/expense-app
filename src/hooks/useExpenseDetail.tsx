import * as atoms from '@/store'

import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'

const useExpenseDetail = () => {
  const param = useParams()
  const [expenseDetail, setExpenseDetail] = useAtom(atoms.expenseAtom)
  const [expenseLists] = useAtom(atoms.expenseListsAtom)
  const [expenseHistory] = useAtom(atoms.historyListsAtom)

  const refreshExpenseDetail = useCallback(() => {
    const filteredExpense = expenseLists.filter((e) => e.history_id === param.id)[0]
    if (!filteredExpense) return

    const totalIncome = expenseHistory
      ?.filter((e) => e.type === 'income')
      .reduce((acc, cur) => acc + cur.amount, 0)
    const totalOutcome = expenseHistory
      ?.filter((e) => e.type === 'outcome')
      .reduce((acc, cur) => acc + cur.amount, 0)

    setExpenseDetail({
      ...filteredExpense,
      totalIncome,
      totalOutcome,
      currentMoney: filteredExpense.total_money + totalIncome - totalOutcome
    })
  }, [expenseLists, expenseHistory])

  return {
    expenseDetail,
    refreshExpenseDetail
  }
}

export default useExpenseDetail
