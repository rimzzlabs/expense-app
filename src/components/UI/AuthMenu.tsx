import { Button } from '@/components'

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
import { Link } from 'react-router-dom'

const AuthMenu: React.FunctionComponent = () => {
  const isMatches = useMediaQuery('(min-width: 768px)')
  const { theme, toggleTheme } = useTheme()
  const { openModal } = useCreateExpenseModal()

  const navRef = useRef<HTMLDivElement>(null)

  const [menuOpen, setMenuOpen] = useState(false)

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
        <Link
          to='/expense'
          className={twclsx(
            'py-2 px-4 transition rounded-lg',
            'hover:bg-theme-2 dark:hover:bg-theme-7'
          )}
        >
          Expense
        </Link>

        <Link
          to='/profile'
          className={twclsx(
            'py-2 px-4 transition rounded-lg',
            'hover:bg-theme-2 dark:hover:bg-theme-7'
          )}
        >
          Profile
        </Link>

        <Button
          onClick={openModal}
          className={twclsx('h-10 md:h-12 w-10 md:w-12', 'text-lg hover:ring')}
        >
          <span className='sr-only'>Add expense</span>
          <Plus />
        </Button>

        <Button
          onClick={toggleTheme}
          className={twclsx('h-10 md:h-12 w-10 md:w-12', 'text-lg hover:ring')}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
      </nav>
    )
  }

  return (
    <div className={twclsx('inline-flex items-center gap-4')}>
      <Button
        onClick={openModal}
        className={twclsx('h-10 md:h-12 w-10 md:w-12', 'text-lg hover:ring')}
      >
        <span className='sr-only'>Add expense</span>
        <Plus />
      </Button>

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
