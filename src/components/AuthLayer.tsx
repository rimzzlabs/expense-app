import { LoadingPage } from '@/components/UI'

import { useUser } from '@/hooks'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type AuthLayerProps = {
  children: React.ReactNode
}

const AuthLayer: React.FunctionComponent<AuthLayerProps> = ({ children }) => {
  const { user } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('run')
    if (!user) {
      navigate('/signin', { replace: true })
    }
  }, [user])

  if (!user) {
    return <LoadingPage />
  }

  return <>{children}</>
}

export default AuthLayer
