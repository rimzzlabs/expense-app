import { supabase, uploadUserAvatar } from '@/services'
import { avatarAtom } from '@/store'

import { User } from 'expense-app'
import { useAtom } from 'jotai'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

const useAvatar = (user: User) => {
  const [avatar, setAvatar] = useAtom(avatarAtom)
  const fileName = user?.id ?? ''

  const clearAvatar = useCallback(() => setAvatar(null), [])

  const refreshAvatar = useCallback(
    async (force = false) => {
      if (!user || (avatar && !force)) return

      const res = await supabase.storage.from('profiles/avatar').download(fileName)
      if (!res.data) {
        if (user.picture) {
          setAvatar(user.picture)
          return
        }
        setAvatar(null)
        return
      }

      const profile = URL.createObjectURL(res.data)
      setAvatar(profile)
    },
    [user]
  )

  const uploadAvatar = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]

        // if file size are uqals or more than 2MB
        if (file.size >= 2e6) {
          toast.error('Sorry, but image must be less than 2MB!')
          return
        }

        const res = await uploadUserAvatar(file, fileName)

        if (!res) return

        await refreshAvatar(true)
      }
    },
    [avatar, user]
  )

  return {
    avatar,
    refreshAvatar,
    uploadAvatar,
    clearAvatar
  }
}

export default useAvatar
