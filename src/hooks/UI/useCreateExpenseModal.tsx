import { createExpenseModalIsOpen } from '@/store'

import { useAtom } from 'jotai'
import { useCallback } from 'react'

const useCreateExpenseModal = () => {
  const [isOpen, setIsOpen] = useAtom(createExpenseModalIsOpen)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  return {
    isOpen,
    openModal,
    closeModal
  }
}

export default useCreateExpenseModal
