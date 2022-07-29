import { editExpenseAtom } from '@/store'

import { useAtom } from 'jotai'
import { useCallback } from 'react'

type PayloadExpenseModal = {
  title: string
  id: string
}

const useEditExpenseModal = () => {
  const [editExpense, setEditExpense] = useAtom(editExpenseAtom)

  const openExpenseModal = useCallback(
    (payload: PayloadExpenseModal) => setEditExpense({ ...payload, isOpen: true }),
    []
  )
  const closeExpenseModal = useCallback(
    () => setEditExpense((prev) => ({ ...prev, isOpen: false })),
    []
  )

  return {
    editExpense,
    openExpenseModal,
    closeExpenseModal
  }
}

export default useEditExpenseModal
