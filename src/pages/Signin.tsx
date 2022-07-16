import { ButtonLink, InputGroup, PrimaryButton } from '@/components'

import { twclsx } from '@/utils'

const SigninPage: React.FunctionComponent = () => {
  return (
    <section className={twclsx('flex flex-col gap-4', 'pt-10 md:gap-8')}>
      <div className='w-full'>
        <h1 className='text-4xl md:text-5xl mb-4'>Welcome back!</h1>
        <p className='mb-2'>let&apos;s miss your history? signin to see your expense history🤑.</p>
      </div>

      <form className='grid grid-cols-1 gap-6 max-w-lg'>
        <h2>
          Signin to{' '}
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary-5 to-ternary-5'>
            ExpenseApp
          </span>
        </h2>
        <InputGroup
          type='email'
          label='Email Address'
          htmlForAndName='email'
          placeholder='Email address to verify you :D'
        />

        <InputGroup
          type='password'
          label='Password'
          htmlForAndName='password'
          placeholder='A strong password is required'
        />

        <div className='flex items-center gap-2'>
          <PrimaryButton className={twclsx('w-full md:max-w-max', 'py-2.5 px-6 font-semibold')}>
            Signin
          </PrimaryButton>
          <ButtonLink
            to='/signup'
            className={twclsx(
              'w-full md:max-w-max',
              'bg-transparent border px-6',
              'text-theme-6 dark:text-theme-3 border-theme-3 dark:border-theme-7',
              'hover:bg-theme-8 dark:hover:bg-theme-6 hover:text-theme-1'
            )}
          >
            Create account
          </ButtonLink>
        </div>
      </form>
    </section>
  )
}

export default SigninPage
