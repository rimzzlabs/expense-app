import { Button, ButtonLink } from '@/components'

import { useTheme, useUser } from '@/hooks'
import { twclsx } from '@/utils'

import { HiMoon as Moon, HiSun as Sun, HiUser as User } from 'react-icons/hi'

const Nav = () => {
  const { user } = useUser()

  const { theme, toggleTheme } = useTheme()

  return (
    <nav className='inline-flex items-center gap-4'>
      {user ? (
        <>
          <Button
            onClick={toggleTheme}
            className={twclsx('h-10 md:h-12 w-10 md:w-12', 'text-lg hover:ring')}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>

          <ButtonLink
            to='/profile'
            className={twclsx(
              'h-10 md:h-12 w-10 md:w-12',
              'text-lg border hover:ring',
              'bg-transparent hover:bg-transparent',
              'border-theme-3 dark:border-theme-7 text-theme-7 dark:text-theme-3'
            )}
          >
            <User />
          </ButtonLink>
        </>
      ) : (
        <>
          <ButtonLink
            to='/signup'
            className='border border-primary-5 bg-transparent text-primary-5 hover:text-theme-1'
          >
            Signup
          </ButtonLink>

          <ButtonLink to='/signin' className='border border-primary-5'>
            Signin
          </ButtonLink>
        </>
      )}
    </nav>
  )
}

export default Nav
