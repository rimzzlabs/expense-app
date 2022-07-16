import { Button } from '@/components/UI'

import { useTheme } from '@/hooks'
import { twclsx } from '@/utils'

import { HiMoon as Moon, HiSun as Sun } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'

const Header: React.FunctionComponent = () => {
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()

  if (pathname === '/404') return null

  return (
    <header
      className={twclsx(
        'fixed top-0 inset-x-0',
        'bg-theme-1 dark:bg-theme-8',
        '[@supports(backdrop-filter:blur(0))]:backdrop-blur',
        '[@supports(backdrop-filter:blur(0))]:bg-theme-1/80',
        '[@supports(backdrop-filter:blur(0))]:dark:bg-theme-8/80'
      )}
    >
      <div className={twclsx('layout', 'flex items-center justify-between', 'h-20')}>
        <p
          className={twclsx(
            'bg-clip-text text-transparent',
            'text-xl md:text-2xl font-bold',
            'bg-gradient-to-r from-primary-5 to-ternary-5'
          )}
        >
          ExpenseApp
        </p>

        <Button
          onClick={toggleTheme}
          className={twclsx('h-10 md:h-12 w-10 md:w-12', 'text-lg hover:ring')}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
      </div>
    </header>
  )
}

export default Header
