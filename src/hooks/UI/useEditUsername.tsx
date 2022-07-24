import { useUser } from '@/hooks'
import { updateUserProfile } from '@/services'
import { editUsernameModal } from '@/store'

import { UpdateUserMetaDataPayload, UpdateUserPayload } from 'expense-app'
import { useAtom } from 'jotai'
import { useCallback } from 'react'

const useEditUsername = () => {
  const [isOpen, setIsOpen] = useAtom(editUsernameModal)
  const user = useUser()

  const openModal = useCallback(() => setIsOpen(true), [user])
  const closeModal = useCallback(() => setIsOpen(false), [user])

  const updateUsername = useCallback(
    async (userPayload: Partial<UpdateUserPayload>, metaData: UpdateUserMetaDataPayload) => {
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
    updateUsername
  }
}

export default useEditUsername
