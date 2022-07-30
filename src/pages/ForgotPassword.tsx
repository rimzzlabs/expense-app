import { ButtonLink, Image, Input, InputError, PrimaryButton } from '@/components'

import illustration from '@/assets/forgot-password.svg'
import { resetPassword } from '@/services'
import { variants } from '@/templates/Layout'
import { forgotPasswordSchema, twclsx } from '@/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { m } from 'framer-motion'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { HiArrowSmLeft } from 'react-icons/hi'

type FormValue = { email: string }

const ForgotPassword: React.FunctionComponent = () => {
  const rhf = useForm<FormValue>({
    defaultValues: { email: '' },
    resolver: yupResolver(forgotPasswordSchema)
  })

  const onSubmit = useCallback(
    async (args: FormValue) => await resetPassword(args.email).finally(() => rhf.reset()),
    []
  )

  return (
    <m.div
      variants={variants}
      initial='hidden'
      animate='enter'
      exit='exit'
      className={twclsx(
        'flex flex-col md:items-center',
        'w-11/12 mx-auto min-h-[96vh] py-10',
        'md:justify-center md:flex-row'
      )}
    >
      <Image src={illustration} alt='Forgot password' className='hidden md:block w-64 md:mb-0' />

      <form onSubmit={rhf.handleSubmit(onSubmit)} className='md:ml-14 max-w-lg'>
        <h1>Forgot your password?</h1>
        <p className='mt-2.5 mb-6 md:mb-8'>
          Don&apos;t worry, you can reset your password at any time, submit your email and then
          ExpenseApp will sent you an email confirmation to update your password.
        </p>

        <div className='flex flex-col gap-2 mb-4'>
          <label htmlFor='email'>Your Email Address</label>

          <Input
            type='email'
            id='email'
            placeholder='Your email address'
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

        <div className='inline-flex items-center gap-4'>
          <PrimaryButton disabled={rhf.formState.isSubmitting} type='submit' className='h-10 px-4'>
            Submit
          </PrimaryButton>

          <ButtonLink
            className='h-10 font-normal gap-2 bg-transparent text-theme-7 dark:text-theme-2 hover:text-theme-1'
            to='/signin'
          >
            <HiArrowSmLeft />
            <span>Back to signin</span>
          </ButtonLink>
        </div>
      </form>
    </m.div>
  )
}

export default ForgotPassword
