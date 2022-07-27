import { PrimaryButton } from '@/components'

import { useStepsUpdateEmail } from '@/hooks'
import { twclsx } from '@/utils'

import Modal from './Modal'

import { useId } from 'react'

const ModalStepsUpdateEmail = () => {
  const { isOpen, closeModal } = useStepsUpdateEmail()

  const steps = [
    { children: 'You change your email address' },
    { children: 'Check your new email address' },
    { children: 'Verify your new email address' },
    { children: 'Check your previous email address' },
    { children: 'Verify your old email address' },
    { children: 'Now you can login with your new email address' }
  ]

  return (
    <Modal
      className='max-w-lg'
      onClose={closeModal}
      show={isOpen}
      title='How to change my email address?'
    >
      <p className='mt-2.5'>Here&apos;s how you change and verify your email address</p>
      <div className='my-4'>
        <div
          className={twclsx(
            'relative flex flex-col',
            'w-full gap-1.5',
            'before:absolute before:left-2.5 before:inset-y-0',
            'before:w-1 before:bg-theme-3 dark:before:bg-theme-6'
          )}
        >
          {steps.map((s, i) => {
            const id = useId()
            return (
              <div key={id} className='relative inline-flex items-center text-sm gap-2.5 py-1.5'>
                <span
                  className={twclsx(
                    'p-0.5 px-2 rounded-full border',
                    'border border-theme-3 dark:border-theme-6',
                    'bg-theme-1 dark:bg-theme-7'
                  )}
                >
                  {++i}
                </span>
                <span>{s.children}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <PrimaryButton onClick={closeModal} className='py-2.5 px-5'>
          Got it!
        </PrimaryButton>
      </div>
    </Modal>
  )
}

export default ModalStepsUpdateEmail
