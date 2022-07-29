import { LoadingPage } from '@/components'

import { useUser } from '@/hooks'

type AuthLayerProps = {
  children: React.ReactNode
}

export const AuthLayer: React.FunctionComponent<AuthLayerProps> = ({ children }) => {
  const user = useUser()

  if (!user) {
    return <LoadingPage />
  }

  return <>{children}</>
}
