import { editExpenseAtom } from '@/store'

import { useAtom } from 'jotai'
import { useCallback } from 'react'

type PayloadExpenseModal = {
  title: string
  id: string
}

const useEditExpense = () => {
  const [editExpense, setEditExpense] = useAtom(editExpenseAtom)

  const openExpenseModal = useCallback(
    (payload: PayloadExpenseModal) => setEditExpense({ ...payload, isOpen: true }),
    []
  )
  const closeExpenseModal = useCallback(
    () => setEditExpense({ id: null, title: null, isOpen: false }),
    []
  )

  return {
    editExpense,
    openExpenseModal,
    closeExpenseModal
  }
}

export default useEditExpense
