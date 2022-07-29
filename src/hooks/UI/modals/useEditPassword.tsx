import { editPasswordModal } from '@/store'

import { useAtom } from 'jotai'
import { useCallback } from 'react'

const useEditPassword = () => {
  const [isOpen, setIsOpen] = useAtom(editPasswordModal)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  return {
    isOpen,
    openModal,
    closeModal
  }
}

export default useEditPassword
