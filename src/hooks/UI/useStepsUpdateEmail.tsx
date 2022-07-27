import { stepsUpdateEmail } from '@/store'

import { useAtom } from 'jotai'
import { useCallback } from 'react'

const useStepsUpdateEmail = () => {
  const [isOpen, setIsOpen] = useAtom(stepsUpdateEmail)
  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  return {
    isOpen,
    openModal,
    closeModal
  }
}

export default useStepsUpdateEmail
