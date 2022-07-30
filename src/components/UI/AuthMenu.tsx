import { Button, Tooltip } from '@/components'

import { useCreateExpenseModal, useMediaQuery, useTheme } from '@/hooks'
import { twclsx } from '@/utils'

import Menu from './Menu'

import { useEffect, useRef, useState } from 'react'
import {
  HiMenuAlt4 as HiMenu,
  HiMoon as Moon,
  HiPlus as Plus,
  HiSun as Sun,
  HiX as X
} from 'react-icons/hi'
import { NavLink, useLocation } from 'react-router-dom'

const AuthMenu: React.FunctionComponent = () => {
  const isMatches = useMediaQuery('(min-width: 768px)')
  const { theme, toggleTheme } = useTheme()
  const { openModal } = useCreateExpenseModal()
  const { pathname } = useLocation()

  const hideCreateButton = pathname === '/profile' || pathname.startsWith('/expense')

  const navRef = useRef<HTMLDivElement>(null)

  const [menuOpen, setMenuOpen] = useState(false)

  const resolveNavLinkClassName = (props: { isActive: boolean }) =>
    twclsx(
      'py-2 px-4 transition rounded-lg',
      props.isActive ? 'bg-primary-5 text-theme-1' : 'hover:bg-theme-2 dark:hover:bg-theme-7'
    )

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
    if (navRef.current) {
      if (menuOpen) {
        navRef.current.classList.add('translate-x-full')
      } else {
        navRef.current.classList.remove('translate-x-full')
      }
    }
  }

  useEffect(() => {
    if (isMatches) setMenuOpen(false)
  }, [isMatches])

  if (isMatches) {
    return (
      <nav className={twclsx('inline-flex items-center gap-2.5')}>
        <NavLink end to='/expense' className={resolveNavLinkClassName}>
          Expense
        </NavLink>

        <NavLink end to='/profile' className={resolveNavLinkClassName}>
          Profile
        </NavLink>

        {!hideCreateButton && (
          <Tooltip title='Add Expense' position='bottom' arrowSize='regular' arrow>
            <Button onClick={openModal} className={twclsx('h-10 w-10', 'text-lg hover:ring')}>
              <span className='sr-only'>Add expense</span>
              <Plus />
            </Button>
          </Tooltip>
        )}

        <Button onClick={toggleTheme} className={twclsx('h-10 w-10', 'text-lg hover:ring')}>
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
      </nav>
    )
  }

  return (
    <div className={twclsx('inline-flex items-center gap-4')}>
      {!hideCreateButton && (
        <Tooltip title='Add Expense' position='bottom' arrowSize='regular' arrow>
          <Button onClick={openModal} className={twclsx('h-10 w-10', 'text-lg hover:ring')}>
            <span className='sr-only'>Add expense</span>
            <Plus />
          </Button>
        </Tooltip>
      )}

      <Button
        onClick={toggleMenu}
        className={twclsx('h-10 md:h-12 w-10 md:w-12', 'text-lg hover:ring')}
      >
        <span className='sr-only'>Show Menu expense</span>
        {menuOpen ? <X /> : <HiMenu />}
      </Button>

      <Menu toggleMenu={toggleMenu} ref={navRef} />
    </div>
  )
}

export default AuthMenu
