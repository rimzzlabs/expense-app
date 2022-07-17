import { Button } from '@/components'

import { usePrompt, useTheme } from '@/hooks'
import { signOut } from '@/services'
import { twclsx } from '@/utils'

import { forwardRef } from 'react'
import { HiLogout as Logout, HiMoon as Moon, HiSun as Sun, HiUser as User } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'

type MenuProps = {
  toggleMenu: () => void
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(({ toggleMenu }, ref) => {
  const { theme, toggleTheme } = useTheme()
  const { openPrompt, closePrompt } = usePrompt()
  const navigate = useNavigate()

  const handleLogout = async () => {
    closePrompt()
    await signOut()
    navigate('/signin')
  }

  const handleLogoutClick = async () => {
    toggleMenu()
    openPrompt({
      message: 'Are you sure you want to signout from ExpenseApp?',
      title: 'Signout warning',
      onConfirm: handleLogout
    })
  }

  return (
    <aside
      ref={ref}
      className={twclsx(
        'fixed right-0 h-[calc(100vh-5rem)] top-20 z-50',
        'transition-transform duration-300 ease-out translate-x-full'
      )}
    >
      <div
        className={twclsx(
          'w-[50vw] h-full border-l shadow-lg dark:shadow-none',
          'border-l-theme-3 dark:border-l-theme-6',
          'bg-theme-1 dark:bg-theme-8'
        )}
      >
        <div className='flex items-center justify-between py-2 px-6'>
          <p className='font-semibold text-lg'>Menu</p>
          <Button onClick={toggleTheme} className={twclsx('h-8 w-8', 'text-lg hover:ring')}>
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>
        </div>

        <nav className={twclsx('flex flex-col', 'h-full w-full')}>
          <Link
            onClick={toggleMenu}
            to='/profile'
            className={twclsx(
              'inline-flex items-center gap-4',
              'w-full py-4 px-6',
              'hover:bg-primary-5 hover:text-theme-1'
            )}
          >
            <User />
            <span>Profile</span>
          </Link>
          <Button
            onClick={handleLogoutClick}
            className={twclsx(
              'inline-flex items-center gap-4',
              'w-full py-4 px-6 border-none justify-start rounded-none',
              'hover:bg-error-2 hover:text-theme-1'
            )}
          >
            <Logout />
            <span>Logout</span>
          </Button>
        </nav>
      </div>
    </aside>
  )
})

Menu.displayName = 'Menu'

export default Menu
