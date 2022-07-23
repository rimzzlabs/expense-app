import { createdHistoryModal } from '@/store'

import { useAtom } from 'jotai'
import { useCallback } from 'react'

const useCreateHistoryModal = () => {
  const [isOpen, setIsOpen] = useAtom(createdHistoryModal)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  return {
    isOpen,
    openModal,
    closeModal
  }
}

export default useCreateHistoryModal
