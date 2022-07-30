import { Button, Input, InputError, Modal, PrimaryButton, Select } from '@/components'

import { useCreateHistoryModal } from '@/hooks'
import useExpenseDetail from '@/hooks/useExpenseDetail'
import { createHistorySchema, twclsx } from '@/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { CreateHistoryPayload } from 'expense-app'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type List = Array<{
  children: string
  value: CreateHistoryPayload['type']
}>

export const ModalCreateHistory = () => {
  const { expenseDetail, addExpenseHistory } = useExpenseDetail()
  const { isOpen, closeModal } = useCreateHistoryModal()

  const defaultValues: CreateHistoryPayload = { source: '', amount: 0, type: 'income' }
  const list: List = [
    { children: 'Income', value: 'income' },
    { children: 'Outcome', value: 'outcome' }
  ]

  const rhf = useForm({
    defaultValues,
    resolver: yupResolver(createHistorySchema)
  })

  const onSubmit = async (val: CreateHistoryPayload) => {
    if (!expenseDetail) {
      rhf.reset()
      return
    }

    if (val.type === 'outcome' && expenseDetail.currentMoney - val.amount < 0) {
      toast.error('Not enough money to spent')
      rhf.reset({ amount: 0, type: 'income', source: val.source })
      rhf.setError('amount', { message: "You're broke😢" })
      rhf.setError('type', { message: "Outcome? you're broke😢" })
      return
    }

    if (expenseDetail.currentMoney === 0 && val.type === 'outcome') {
      toast.error("You don't have any money left!")
      rhf.reset()
      return
    }

    await addExpenseHistory(val)
    closeModal()
    rhf.reset()
  }

  useEffect(() => {
    const timer = setTimeout(() => rhf.reset({ source: '' }, { keepDefaultValues: true }), 300)

    return () => clearTimeout(timer)
  }, [isOpen])

  return (
    <Modal show={isOpen} onClose={closeModal} title='New History' className={twclsx('max-w-lg')}>
      <p className='max-w-prose mt-2'>Add income or outcome to your expense&apos;s history</p>

      <form
        onSubmit={rhf.handleSubmit(onSubmit)}
        className={twclsx('flex flex-col gap-4 md:gap-6', 'w-full mt-8')}
      >
        <div className='inline-flex flex-col gap-2.5'>
          <label htmlFor='source'>Source</label>
          <Input
            type='text'
            id='source'
            placeholder='E.g: Buy coffee or part time'
            className={twclsx(
              rhf.formState.errors.source?.message &&
                'border-error-1 dark:border-error-1 focus:border-error-2 focus:ring-error-1'
            )}
            {...rhf.register('source')}
          />
          {rhf.formState.errors.source?.message && (
            <InputError msg={rhf.formState.errors.source.message} />
          )}
        </div>

        <div className='inline-flex flex-col gap-2.5'>
          <label htmlFor='amount'>Amount money💸</label>
          <Input
            type='number'
            id='amount'
            placeholder='The money you want to add'
            className={twclsx(
              rhf.formState.errors.amount?.message &&
                'border-error-1 dark:border-error-1 focus:border-error-2 focus:ring-error-1'
            )}
            {...rhf.register('amount', {
              valueAsNumber: true
            })}
          />
          {rhf.formState.errors.amount?.message && (
            <InputError msg={rhf.formState.errors.amount.message} />
          )}
        </div>

        <div className='inline-flex flex-col gap-2.5'>
          <label htmlFor='type'>Type</label>
          <Select list={list} id='type' {...rhf.register('type')} />
          {rhf.formState.errors.type?.message && (
            <InputError msg={rhf.formState.errors.type.message} />
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
