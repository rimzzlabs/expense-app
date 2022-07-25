import { useUser } from '@/hooks'
import { updateUserProfile } from '@/services'
import { editEmailModal } from '@/store'

import { UpdateUserMetaDataPayload, UpdateUserPayload } from 'expense-app'
import { useAtom } from 'jotai'
import { useCallback } from 'react'

const useEditEmail = () => {
  const [isOpen, setIsOpen] = useAtom(editEmailModal)
  const user = useUser()

  const openModal = useCallback(() => setIsOpen(true), [user])
  const closeModal = useCallback(() => setIsOpen(false), [user])

  const updateEmailAddress = useCallback(
    async (userPayload: Partial<UpdateUserPayload>, metaData?: UpdateUserMetaDataPayload) => {
      if (!user) return

      await updateUserProfile(userPayload, metaData)
      closeModal()
    },
    [user]
  )

  return {
    isOpen,
    openModal,
    closeModal,
    updateEmailAddress
  }
}

export default useEditEmail
