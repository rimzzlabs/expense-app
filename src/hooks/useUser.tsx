import { supabase } from '@/services'
import { userAtom } from '@/store'

import { useAtom } from 'jotai'
import { useEffect } from 'react'

const useUser = () => {
  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    const supabaseUser = supabase.auth.user()
    if (supabaseUser) {
      setUser({
        email: supabaseUser?.email as string,
        username: supabaseUser?.user_metadata.username as string,
        id: supabaseUser.id
      })
    } else {
      setUser(null)
    }
  }, [supabase.auth.user])

  return {
    user
  }
}

export default useUser
