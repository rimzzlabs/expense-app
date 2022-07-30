import { ButtonLink, Input, InputError, OAuthButton, PrimaryButton } from '@/components'

import { useUser } from '@/hooks'
import { signIn } from '@/services'
import { signinSchema, twclsx } from '@/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { SigninUserPayload } from 'expense-app'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const SigninPage: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const user = useUser()

  const defaultValues: SigninUserPayload = { email: '', password: '' }
  const rhf = useForm<SigninUserPayload>({
    defaultValues,
    resolver: yupResolver(signinSchema)
  })

  const onSubmit = async (args: SigninUserPayload) => {
    const response = await signIn(args)
    if (response) {
      navigate('/', { replace: true })
    }
    if (!response) {
      rhf.resetField('password')
      rhf.setError('password', { message: 'Password is required' })
    } else {
      rhf.reset()
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user])

  return (
    <section className={twclsx('flex flex-col gap-4', 'pt-10 md:gap-8')}>
      <div className='w-full'>
        <h1 className='text-4xl md:text-5xl mb-2'>Welcome back!</h1>
        <p>Miss your expense history? signin to see your expenses💰.</p>
      </div>

      <form onSubmit={rhf.handleSubmit(onSubmit)} className='grid grid-cols-1 gap-6 max-w-md'>
        <h2>
          Signin to{' '}
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary-5 to-ternary-5'>
            ExpenseApp
          </span>
        </h2>

        <div className='flex flex-col gap-2'>
          <label htmlFor='email'>Email</label>

          <Input
            type='email'
            id='email'
            placeholder='Your ExpenseApp email address'
            className={twclsx(
              rhf.formState.errors.email?.message &&
                'border-error-1 dark:border-error-1 focus:border-error-1 focus:ring-error-1'
            )}
            {...rhf.register('email')}
          />
          {rhf.formState.errors.email?.message && (
            <InputError msg={rhf.formState.errors.email.message} />
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='password'>Password</label>

          <Input
            type='password'
            id='password'
            placeholder='Your ExpenseApp password'
            className={twclsx(
              rhf.formState.errors.password?.message &&
                'border-error-1 dark:border-error-1 focus:border-error-1 focus:ring-error-1'
            )}
            {...rhf.register('password')}
          />
          {rhf.formState.errors.password?.message && (
            <InputError msg={rhf.formState.errors.password.message} />
          )}
          <Link to='/forgot-password' className='max-w-max border-0 p-0 ml-auto text-error-1'>
            Forgot passsword?
          </Link>
        </div>

        <div className='flex flex-col md:flex-row items-center gap-4 md:gap-2.5'>
          <PrimaryButton
            disabled={rhf.formState.isSubmitting}
            className={twclsx('w-full', 'py-2.5 px-6 font-semibold')}
          >
            Signin
          </PrimaryButton>
          <ButtonLink
            to='/signup'
            className={twclsx(
              'w-full',
              'bg-transparent border px-6',
              'text-theme-6 dark:text-theme-3 border-theme-3 dark:border-theme-7',
              'hover:bg-theme-8 dark:hover:bg-theme-6 hover:text-theme-1'
            )}
          >
            Create account
          </ButtonLink>
        </div>
      </form>

      <OAuthButton />
    </section>
  )
}

export default SigninPage
