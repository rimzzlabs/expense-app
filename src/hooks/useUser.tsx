import { supabase } from '@/services'
import { userAtom } from '@/store'

import { useAtom } from 'jotai'
import { useEffect } from 'react'

const useUser = () => {
  const supabaseUser = supabase.auth.user()
  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    if (!supabaseUser) {
      setUser(null)
      return
    }
    setUser({
      email: supabaseUser.email as string,
      id: supabaseUser.id,
      username: supabaseUser.user_metadata.username,
      name: supabaseUser.user_metadata?.name ?? null,
      picture: supabaseUser.user_metadata?.picture ?? null
    })
  }, [supabase.auth.user()])

  if (!user) return null

  return user
}

export default useUser
