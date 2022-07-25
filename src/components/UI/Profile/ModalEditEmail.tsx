import { Button, Input, InputError, Modal, PrimaryButton } from '@/components'

import { useEditEmail, useUser } from '@/hooks'
import { editEmailSchema, twclsx } from '@/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
}

export const ModalEditEmail: React.FunctionComponent = () => {
  const { isOpen, closeModal, updateEmailAddress } = useEditEmail()
  const user = useUser()

  const rhf = useForm<FormData>({
    defaultValues: { email: user?.email ?? '' },
    resolver: yupResolver(editEmailSchema(user?.email ?? ''))
  })

  const onSubmit = async (args: FormData) => {
    console.info(args)
    await updateEmailAddress({ ...args })
    rhf.reset()
  }

  useEffect(() => {
    rhf.setValue('email', user?.email ?? '')
  }, [user])

  return (
    <Modal show={isOpen} onClose={closeModal} title='Update Email address' className='max-w-lg'>
      <p className='max-w-prose mt-2'>Update your Email address</p>
      <span className='text-xs md:text-sm font-semibold text-warning-1'>
        * You need to verify your new email address after changed your email address
      </span>

      <form onSubmit={rhf.handleSubmit(onSubmit)} className='mt-6 w-full'>
        <div className='inline-flex flex-col gap-2.5 w-full'>
          <label htmlFor='email'>Email Address</label>
          <Input
            type='email'
            id='email'
            placeholder='Your new email address'
            className={twclsx(
              rhf.formState.errors.email?.message &&
                'border-error-1 dark:border-error-1 focus:border-error-2 focus:ring-error-1'
            )}
            {...rhf.register('email')}
          />
          {rhf.formState.errors.email?.message && (
            <InputError msg={rhf.formState.errors.email.message} />
          )}
        </div>

        <div className='inline-flex items-center gap-4 mt-4'>
          <PrimaryButton
            disabled={rhf.formState.isSubmitting}
            type='submit'
            className={twclsx('py-2 px-3 md:py-2.5 md:px-4')}
          >
            Submit
          </PrimaryButton>

          <Button
            onClick={closeModal}
            type='button'
            className={twclsx(
              'py-2 px-3 md:py-2.5 md:px-4 border',
              'dark:border-theme-5 hover:bg-theme-2 dark:hover:bg-theme-5'
            )}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}
