import { ButtonLink } from '@/components/UI'

import { useUser } from '@/hooks'
import { twclsx } from '@/utils'

import { HiArrowSmLeft } from 'react-icons/hi'

const NotFoundPage: React.FunctionComponent = () => {
  const user = useUser()
  return (
    <div className={twclsx('flex items-center justify-center', 'w-full h-screen')}>
      <section className='flex flex-col text-center'>
        <h1 className='mb-4'>404 | Page Not Found</h1>
        <p className='mb-6'>The page you&apos;re looking for are not found 🔍</p>
        <ButtonLink className='max-w-max mx-auto gap-2' to={user ? '/' : '/signup'}>
          <HiArrowSmLeft />
          <span>Homepage</span>
        </ButtonLink>
      </section>
    </div>
  )
}

export default NotFoundPage
