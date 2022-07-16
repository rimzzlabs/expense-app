import { LoadingPage } from '@/components/UI'

import { useUser } from '@/hooks'

type AuthLayerProps = {
  children: React.ReactNode
}

const AuthLayer: React.FunctionComponent<AuthLayerProps> = ({ children }) => {
  const { user } = useUser()

  if (!user) {
    return <LoadingPage />
  }

  return <>{children}</>
}

export default AuthLayer
