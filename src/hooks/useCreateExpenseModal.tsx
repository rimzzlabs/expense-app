import { createExpenseModalIsOpen } from '@/store'

import { useAtom } from 'jotai'

const useCreateModalExpense = () => {
  const [isOpen, setIsOpen] = useAtom(createExpenseModalIsOpen)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return {
    isOpen,
    openModal,
    closeModal
  }
}

export default useCreateModalExpense
