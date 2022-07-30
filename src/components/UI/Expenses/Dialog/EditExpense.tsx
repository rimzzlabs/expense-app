import { Button, Input, InputError, Modal, PrimaryButton } from '@/components'

import { useEditExpenseModal, useExpense, useUser } from '@/hooks'
import { updateExpense } from '@/services'
import { editExpenseSchema, twclsx } from '@/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type EditExpensePayload = { title: string }

export const EditExpense: React.FunctionComponent = () => {
  const { editExpense, closeExpenseModal } = useEditExpenseModal()
  const user = useUser()
  const { refreshExpense, clearValue } = useExpense()

  const rhf = useForm<EditExpensePayload>({
    defaultValues: { title: '' },
    resolver: yupResolver(editExpenseSchema(editExpense.title ?? ''))
  })

  const onSubmit = async (args: EditExpensePayload) => {
    if (editExpense && user) {
      await updateExpense({ id: editExpense.id as string, title: args.title }, user.id)
      await refreshExpense()

      clearValue()
      closeExpenseModal()
    }
  }

  useEffect(() => {
    if (editExpense.isOpen && editExpense.title) {
      rhf.setValue('title', editExpense.title)
      return
    }

    const timer = setTimeout(() => rhf.reset(), 200)

    return () => clearTimeout(timer)
  }, [editExpense.isOpen])

  return (
    <Modal
      show={editExpense.isOpen}
      onClose={closeExpenseModal}
      title={'Edit ' + editExpense.title}
      className='max-w-lg'
    >
      <p className='max-w-prose mt-2'>Edit curent expense</p>

      <form onSubmit={rhf.handleSubmit(onSubmit)} className='mt-6 w-full'>
        <div className='inline-flex flex-col gap-2.5 w-full'>
          <label htmlFor='title'>Title</label>
          <Input
            type='text'
            id='title'
            placeholder='E.g: August Saving'
            className={twclsx(
              rhf.formState.errors.title?.message &&
                'border-error-1 dark:border-error-1 focus:border-error-2 focus:ring-error-1'
            )}
            {...rhf.register('title')}
          />
          {rhf.formState.errors.title?.message && (
            <InputError msg={rhf.formState.errors.title.message} />
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
            onClick={closeExpenseModal}
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
