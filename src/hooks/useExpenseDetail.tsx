import { expenseAtom, expenseListsAtom } from '@/store'

import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const useExpenseDetail = () => {
  const [expenseLists] = useAtom(expenseListsAtom)
  const [expense, setExpense] = useAtom(expenseAtom)
  const param = useParams()

  useEffect(() => {
    const expense = expenseLists.filter((expense) => expense.history_id === param.id)[0]
    setExpense({ ...expense })
  }, [param.id, expenseLists])

  return {
    expense
  }
}

export default useExpenseDetail
