import { Button, Input, InputError, Modal, PrimaryButton } from '@/components'

import { useCreateExpenseModal, useExpense, useUser } from '@/hooks'
import { createExpense } from '@/services'
import { createExpenseSchema, twclsx } from '@/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { CreateExpensePayload } from 'expense-app'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const CreateExpenseModal: React.FunctionComponent = () => {
  const defaultValues: CreateExpensePayload = { title: '', total_money: 0 }
  const user = useUser()
  const { refreshExpense } = useExpense()

  const { isOpen, closeModal } = useCreateExpenseModal()
  const rhf = useForm<CreateExpensePayload>({
    defaultValues,
    resolver: yupResolver(createExpenseSchema)
  })

  const onSubmit = async (args: CreateExpensePayload) => {
    await createExpense(args, user?.id as string)
    await refreshExpense()

    closeModal()
    rhf.reset()
  }

  useEffect(() => {
    if (isOpen) rhf.reset()
  }, [isOpen])

  return (
    <Modal show={isOpen} onClose={closeModal} title='Create expense' className={twclsx('max-w-lg')}>
      <p className='max-w-prose mt-2'>
        Just like a wallet, expense represent your wallet to display how much money you are
        currently want to calculate with your income and outcome.
      </p>

      <form
        onSubmit={rhf.handleSubmit(onSubmit)}
        className={twclsx('flex flex-col gap-4 md:gap-6', 'w-full mt-8')}
      >
        <div className='inline-flex flex-col gap-2.5'>
          <label htmlFor='title'>Expense name</label>
          <Input
            type='text'
            id='title'
            placeholder='E.g: June savings'
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

        <div className='inline-flex flex-col gap-2.5'>
          <label htmlFor='total_money'>Amount money💸</label>
          <Input
            type='number'
            id='total_money'
            placeholder='The money you want to put'
            className={twclsx(
              rhf.formState.errors.total_money?.message &&
                'border-error-1 dark:border-error-1 focus:border-error-2 focus:ring-error-1'
            )}
            {...rhf.register<keyof CreateExpensePayload>('total_money', {
              valueAsNumber: true
            })}
          />
          {rhf.formState.errors.total_money?.message && (
            <InputError msg={rhf.formState.errors.total_money.message} />
          )}
        </div>

        <div className='inline-flex items-center gap-4'>
          <PrimaryButton
            disabled={rhf.formState.isSubmitting}
            type='submit'
            className='py-2 px-4 md:py-2.5 md:px-6'
          >
            Create
          </PrimaryButton>
          <Button
            type='button'
            onClick={closeModal}
            className={twclsx(
              'py-2 px-4 md:py-2.5 md:px-6',
              'dark:border-theme-6 hover:bg-theme-3 dark:hover:bg-theme-5'
            )}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}
