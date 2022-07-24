import { Button } from '@/components'

import { useAvatar, usePrompt, useTheme, useUser } from '@/hooks'
import { signOut } from '@/services'
import { twclsx } from '@/utils'

import { User } from 'expense-app'
import { forwardRef } from 'react'
import { HiCurrencyDollar, HiLogout, HiUser, HiMoon as Moon, HiSun as Sun } from 'react-icons/hi'
import { NavLink, useNavigate } from 'react-router-dom'

type MenuProps = {
  toggleMenu: () => void
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(({ toggleMenu }, ref) => {
  const user = useUser()
  const { theme, toggleTheme } = useTheme()
  const { openPrompt, closePrompt } = usePrompt()
  const { clearAvatar } = useAvatar(user as User)
  const navigate = useNavigate()

  const resolveNavLinkClassName = (props: { isActive: boolean }) =>
    twclsx(
      'inline-flex items-center gap-4',
      'w-full py-4 px-6',
      props.isActive ? 'bg-primary-5 text-theme-1' : 'hover:bg-primary-3 hover:text-theme-1'
    )

  const handleLogout = async () => {
    await signOut()
    clearAvatar()
    closePrompt()
    navigate('/signin')
  }

  const handleSignoutClick = async () => {
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
          <Button onClick={toggleTheme} className={twclsx('h-9 w-9', 'text-lg hover:ring')}>
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>
        </div>

        <nav className={twclsx('flex flex-col', 'h-full w-full')}>
          <NavLink onClick={toggleMenu} to='/profile' className={resolveNavLinkClassName}>
            <HiUser />
            <span>Profile</span>
          </NavLink>
          <NavLink onClick={toggleMenu} to='/expense' className={resolveNavLinkClassName}>
            <HiCurrencyDollar />
            <span>Expense</span>
          </NavLink>
          <Button
            onClick={handleSignoutClick}
            className={twclsx(
              'inline-flex items-center gap-4',
              'w-full py-4 px-6 border-none justify-start rounded-none',
              'hover:bg-error-2 hover:text-theme-1'
            )}
          >
            <HiLogout />
            <span>Sign out</span>
          </Button>
        </nav>
      </div>
    </aside>
  )
})

Menu.displayName = 'Menu'

export default Menu
