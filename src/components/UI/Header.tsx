import { twclsx } from '@/utils'

import Nav from './Nav'

import { Link, useLocation } from 'react-router-dom'

const Header: React.FunctionComponent = () => {
  const { pathname } = useLocation()

  if (pathname === '/404') return null

  return (
    <header
      className={twclsx(
        'fixed top-0 inset-x-0 z-40',
        'bg-theme-1 dark:bg-theme-8',
        '[@supports(backdrop-filter:blur(0))]:backdrop-blur',
        '[@supports(backdrop-filter:blur(0))]:bg-theme-1/80',
        '[@supports(backdrop-filter:blur(0))]:dark:bg-theme-8/80'
      )}
    >
      <div className={twclsx('layout', 'flex items-center justify-between', 'h-20')}>
        <Link
          to='/'
          className={twclsx(
            'bg-clip-text text-transparent',
            'text-xl md:text-2xl font-bold',
            'bg-gradient-to-r from-primary-5 to-ternary-5'
          )}
        >
          ExpenseApp
        </Link>

        <Nav />
      </div>
    </header>
  )
}

export default Header
