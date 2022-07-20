import { getExpenseHistory } from '@/services'
import * as atoms from '@/store'

import { useAtom } from 'jotai'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const useExpenseHistory = () => {
  const [expenseHistory, setExpenseHistory] = useAtom(atoms.historyListsAtom)
  const [isOpen, setIsOpen] = useAtom(atoms.createdHistoryModal)
  const param = useParams()

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  const refreshExpenseHistory = useCallback(
    async () => await getExpenseHistory(param.id as string),
    []
  )

  useEffect(() => {
    if (param.id) {
      ;(async () => {
        const response = await refreshExpenseHistory()
        if (response) setExpenseHistory(response)
      })()
    }
  }, [])
  return {
    expenseHistory,
    isOpen,
    openModal,
    closeModal
  }
}

export default useExpenseHistory
