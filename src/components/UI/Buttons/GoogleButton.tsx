import { Button, Image } from '@/components'

import google from '@/assets/google.svg'
import { SignInWithGoogle } from '@/services'
import { twclsx } from '@/utils'

const GoogleButton = () => {
  return (
    <Button
      className={twclsx(
        'gap-2.5',
        'h-10 md:h-12 w-full',
        'pr-[1em] font-semibold',
        'bg-theme-1 text-theme-7',
        'hover:bg-theme-2'
      )}
      onClick={SignInWithGoogle}
    >
      <Image className='w-[1em] h-[1em]' src={google} alt='google' />
      <span>Signin with Google </span>
    </Button>
  )
}

export default GoogleButton
