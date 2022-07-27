import { twclsx } from '@/utils'

import { GitHubButton, GoogleButton } from './Buttons'

const OAuthButton: React.FunctionComponent = () => (
  <div className={twclsx('flex flex-col items-center', 'max-w-md gap-2.5 flex-auto')}>
    <GitHubButton />
    <GoogleButton />
  </div>
)

export default OAuthButton
