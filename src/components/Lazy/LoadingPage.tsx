import { twclsx } from '@/utils'

import { ImSpinner2 as Spinner } from 'react-icons/im'

const LoadingPage: React.FunctionComponent = () => {
  return (
    <div
      className={twclsx(
        'flex items-center justify-center',
        'w-full h-screen',
        'fixed top-20 left-0 right-0 bottom-0',
        'bg-theme-1 dark:bg-theme-8',
        'z-50'
      )}
    >
      <Spinner className='w-24 h-24 text-primary-5 animate-spin' />
    </div>
  )
}

export default LoadingPage
