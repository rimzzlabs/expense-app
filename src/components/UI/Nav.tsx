import { ButtonLink } from '@/components'

import { useUser } from '@/hooks'

import AuthMenu from './AuthMenu'

const Nav = () => {
  const user = useUser()

  if (!user) {
    return (
      <nav className='inline-flex items-center gap-4'>
        <ButtonLink
          to='/signup'
          className='border border-primary-5 bg-transparent text-primary-5 hover:text-theme-1'
        >
          Signup
        </ButtonLink>

        <ButtonLink to='/signin' className='border border-primary-5'>
          Signin
        </ButtonLink>
      </nav>
    )
  }

  return <AuthMenu />
}

export default Nav
