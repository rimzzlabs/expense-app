import { supabase } from '@/services'
import { avatarAtom } from '@/store'

import { User } from 'expense-app'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

const useAvatar = (user: User) => {
  const [avatar, setAvatar] = useAtom(avatarAtom)
  const bucketID = user.username + user.id

  useEffect(() => {
    ;(async () => {
      if (!user || avatar) return

      const res = await supabase.storage.from('profiles').download(bucketID)
      if (!res.data) {
        setAvatar(null)
        return
      }

      const profile = URL.createObjectURL(res.data)
      setAvatar(profile)
    })()
  }, [user])

  return avatar
}

export default useAvatar
