import { Button, Input, InputError, Modal, PrimaryButton } from '@/components'

import { useEditUsername, useUser } from '@/hooks/'
import { editUsernameSchema, twclsx } from '@/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  username: string
}

export const ModalEditUsername: React.FunctionComponent = () => {
  const { isOpen, closeModal, updateUsername } = useEditUsername()
  const user = useUser()

  const rhf = useForm<FormData>({
    defaultValues: { username: user?.username ?? '' },
    resolver: yupResolver(editUsernameSchema(user?.username ?? ''))
  })

  const onSubmit = async (args: FormData) => {
    await updateUsername({ email: user?.email }, { username: args.username })
    rhf.reset()
  }

  useEffect(() => {
    rhf.setValue('username', user?.username ?? '')
  }, [user])

  return (
    <Modal show={isOpen} onClose={closeModal} title='Update username' className='max-w-lg'>
      <p className='max-w-prose mt-2'>Update username</p>

      <form onSubmit={rhf.handleSubmit(onSubmit)} className='mt-6 w-full'>
        <div className='inline-flex flex-col gap-2.5 w-full'>
          <label htmlFor='username'>Username</label>
          <Input
            type='text'
            id='username'
            placeholder='E.g: JohnWick911'
            className={twclsx(
              rhf.formState.errors.username?.message &&
                'border-error-1 dark:border-error-1 focus:border-error-2 focus:ring-error-1'
            )}
            {...rhf.register('username')}
          />
          {rhf.formState.errors.username?.message && (
            <InputError msg={rhf.formState.errors.username.message} />
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
