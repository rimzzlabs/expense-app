import { createdHistoryModal } from '@/store'

import { useAtom } from 'jotai'

const useCreateHistoryModal = () => {
  const [isOpen, setIsOpen] = useAtom(createdHistoryModal)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return {
    isOpen,
    openModal,
    closeModal
  }
}

export default useCreateHistoryModal
