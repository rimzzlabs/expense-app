import { Button, Input, InputError, Modal, PrimaryButton } from '@/components'

import { useEditHistoryModal, useExpenseDetail } from '@/hooks'
import { updateExpenseHistory } from '@/services'
import { editHistorySchema, twclsx } from '@/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

type EditPayload = { source: string }

export const ModalEditHistory = () => {
  const { editHistory, closeModal } = useEditHistoryModal()
  const { refreshHistoryLists, clearValue } = useExpenseDetail()
  const rhf = useForm<EditPayload>({
    defaultValues: {
      source: ''
    },
    resolver: yupResolver(editHistorySchema(editHistory.source ?? ''))
  })

  const onSubmit = useCallback(
    async (args: EditPayload) => {
      if (!editHistory.id) return

      await updateExpenseHistory(args, editHistory.id)
      await refreshHistoryLists()

      clearValue()
      closeModal()
    },
    [editHistory]
  )

  useEffect(() => {
    if (editHistory.isOpen && editHistory.source) {
      rhf.setValue('source', editHistory.source)
      return
    }

    const timer = setTimeout(() => rhf.reset(), 200)

    return () => clearTimeout(timer)
  }, [editHistory.isOpen])

  return (
    <Modal
      show={editHistory.isOpen}
      onClose={closeModal}
      title={'Edit ' + editHistory.source}
      className='max-w-lg'
    >
      <p className='max-w-prose mt-2'>Edit the current history</p>

      <form onSubmit={rhf.handleSubmit(onSubmit)} className='mt-6 w-full'>
        <div className='inline-flex flex-col gap-2.5 w-full'>
          <label htmlFor='title'>Title</label>
          <Input
            type='text'
            id='title'
            placeholder='E.g: August Saving'
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
