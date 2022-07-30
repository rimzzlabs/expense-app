import { Button, Input, InputError, Modal, PrimaryButton } from '@/components'

import { useEditPassword } from '@/hooks'
import { updateUserPassword } from '@/services'
import { editPasswordSchema, twclsx } from '@/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type FormValue = { password: string }

export const ModalEditPassword: React.FunctionComponent = () => {
  const { isOpen, closeModal } = useEditPassword()

  const rhf = useForm<FormValue>({
    defaultValues: { password: '' },
    resolver: yupResolver(editPasswordSchema)
  })

  const onSubmit = async (args: FormValue) => {
    const res = await updateUserPassword(args.password)
    if (!res) {
      closeModal()
      return
    }
    closeModal()
  }

  useEffect(() => {
    const timer = setTimeout(() => rhf.reset(), 200)

    return () => clearTimeout(timer)
  }, [isOpen])

  return (
    <Modal show={isOpen} onClose={closeModal} title='Update Password' className='max-w-lg'>
      <p className='mt-4 mb-2.5'>
        After updating your password, you should able to login with your new password.
      </p>

      <form onSubmit={rhf.handleSubmit(onSubmit)} className='mt-6 w-full'>
        <div className='inline-flex flex-col gap-2.5 w-full'>
          <label htmlFor='password'>Password</label>
          <Input
            type='password'
            id='password'
            placeholder='A strong password is required'
            className={twclsx(
              rhf.formState.errors.password?.message &&
                'border-error-1 dark:border-error-1 focus:border-error-2 focus:ring-error-1'
            )}
            {...rhf.register('password')}
          />
          {rhf.formState.errors.password?.message && (
            <InputError msg={rhf.formState.errors.password.message} />
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
