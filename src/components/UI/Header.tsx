import { twclsx } from '@/utils'

import Nav from './Nav'

import { HiArrowLeft } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'

const Header: React.FunctionComponent = () => {
  const { pathname } = useLocation()
  const isOnHomepage = pathname === '/' || pathname === '/signin' || pathname === '/signup'
  const shouldHeaderHidden =
    pathname === '/404' || pathname === '/privacy-policy' || pathname === '/forgot-password'

  if (shouldHeaderHidden) return null

  return (
    <header
      className={twclsx(
        'fixed top-0 inset-x-0 z-40',
        'bg-theme-1 dark:bg-theme-8',
        '[@supports(backdrop-filter:blur(0))]:backdrop-blur',
        '[@supports(backdrop-filter:blur(0))]:bg-theme-1/80',
        '[@supports(backdrop-filter:blur(0))]:dark:bg-theme-8/80',
        ' border-b border-b-theme-3 dark:border-b-theme-7'
      )}
    >
      <div className={twclsx('layout relative', 'flex items-center justify-between', 'h-20')}>
        <Link
          to='/'
          className={twclsx(
            isOnHomepage &&
              'bg-clip-text text-transparent text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-5 to-ternary-5',
            !isOnHomepage &&
              'group inline-flex items-center gap-2 py-2 px-4 rounded-lg transition hover:bg-theme-3 dark:hover:bg-theme-7'
          )}
        >
          {!isOnHomepage && (
            <HiArrowLeft className='group-hover:translate-x-1 transition-transform' />
          )}
          {isOnHomepage ? 'ExpenseApp' : <span>Back</span>}
        </Link>

        <Nav />
      </div>
    </header>
  )
}

export default Header
