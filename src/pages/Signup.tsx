import { ButtonLink, Input, InputError, PrimaryButton } from '@/components'

import { signUp } from '@/services'
import { signupSchema, twclsx } from '@/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { SignupUserPayload } from 'expense-app'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const SignupPage: React.FunctionComponent = () => {
  const defaultValues: SignupUserPayload = { email: '', password: '', username: '' }
  const navigate = useNavigate()

  const rhf = useForm<SignupUserPayload>({
    defaultValues,
    resolver: yupResolver(signupSchema),
    shouldFocusError: true
  })

  const onSubmit = async (args: SignupUserPayload) => {
    const response = await signUp(args)

    if (response) {
      navigate('/', { replace: true })
    }

    rhf.reset()
  }

  return (
    <section className={twclsx('flex flex-col gap-6', 'pt-10 md:gap-12')}>
      <form
        onSubmit={rhf.handleSubmit(onSubmit)}
        className='grid grid-cols-1 flex-auto gap-6 max-w-lg'
      >
        <h2>
          Signup to{' '}
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary-5 to-ternary-5'>
            ExpenseApp
          </span>
        </h2>

        <div className='flex flex-col gap-2'>
          <label htmlFor='username'>Username</label>

          <Input
            id='username'
            placeholder='A neat username is required'
            className={twclsx(
              rhf.formState.errors.username?.message &&
                'border-error-1 dark:border-error-1 focus:border-error-1 focus:ring-error-1'
            )}
            {...rhf.register('username')}
          />
          {rhf.formState.errors.username?.message && (
            <InputError msg={rhf.formState.errors.username.message} />
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='email'>Email</label>

          <Input
            type='email'
            id='email'
            placeholder='Email address is required'
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
            placeholder='A strong password is required'
            className={twclsx(
              rhf.formState.errors.password?.message &&
                'border-error-1 dark:border-error-1 focus:border-error-1 focus:ring-error-1'
            )}
            {...rhf.register('password')}
          />
          {rhf.formState.errors.password?.message && (
            <InputError msg={rhf.formState.errors.password.message} />
          )}
          <span className='text-sm text-success-2 dark:text-success-1'>
            * ExpenseApp will not share your data
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <PrimaryButton
            type='submit'
            className={twclsx('w-full md:max-w-max', 'py-2.5 px-6 font-semibold')}
          >
            Signup
          </PrimaryButton>
          <ButtonLink
            to='/signin'
            className={twclsx(
              'w-full md:max-w-max',
              'bg-transparent border px-6',
              'text-theme-6 dark:text-theme-3 border-theme-3 dark:border-theme-7',
              'hover:bg-theme-8 dark:hover:bg-theme-6 hover:text-theme-1'
            )}
          >
            Signin
          </ButtonLink>
        </div>
      </form>
    </section>
  )
}

export default SignupPage
