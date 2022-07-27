import { SignInWithGitHub } from '@/services'
import { twclsx } from '@/utils'

import Button from './Button'

import { IoLogoGithub } from 'react-icons/io5'

const GitHubButton = () => {
  return (
    <Button
      className={twclsx(
        'h-10 md:h-12 w-full',
        'px-4 gap-2.5 font-semibold',
        'bg-theme-7 text-theme-1',
        'hover:bg-theme-6'
      )}
      onClick={SignInWithGitHub}
    >
      <IoLogoGithub className='text-lg' />
      <span>Signin with GitHub</span>
    </Button>
  )
}

export default GitHubButton
