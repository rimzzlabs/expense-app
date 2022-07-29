import { editHistoryAtom } from '@/store'

import { useAtom } from 'jotai'
import { useCallback } from 'react'

type PayloadEditHistoryModal = {
  source: string
  id: string
}

const useEditHistoryModal = () => {
  const [editHistory, setEditHistory] = useAtom(editHistoryAtom)

  const openModal = useCallback(
    (payload: PayloadEditHistoryModal) => setEditHistory({ ...payload, isOpen: true }),
    []
  )
  const closeModal = useCallback(() => setEditHistory((prev) => ({ ...prev, isOpen: false })), [])

  return {
    openModal,
    closeModal,
    editHistory
  }
}

export default useEditHistoryModal
