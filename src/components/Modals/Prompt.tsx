import { ErrorButton, PrimaryButton } from '@/components'

import { twclsx } from '@/utils'

import { Dialog, Transition } from '@headlessui/react'
import { Prompt } from 'expense-app'
import { Fragment } from 'react'

const ModalPrompt: React.FunctionComponent<Prompt> = (props) => {
  return (
    <Transition as={Fragment} show={props.isOpen}>
      <Dialog as='div' onClose={props.onClose} className='relative z-50'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div
            className={twclsx(
              'fixed inset-0',
              'bg-theme-1/50 dark:bg-theme-8/50',
              '[@supports(backdrop-filter:blur(0))]:backdrop-blur-md',
              '[@supports(backdrop-filter:blur(0))]:bg-theme-1/80',
              '[@supports(backdrop-filter:blur(0))]:bg-theme-7/80'
            )}
          />
        </Transition.Child>

        <div className={twclsx('fixed inset-0 flex items-center justify-center')}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel
              as='div'
              className={twclsx(
                'w-11/12 max-w-lg p-6 lg:p-8 rounded-lg shadow-lg',
                'bg-theme-1 dark:bg-theme-6'
              )}
            >
              <Dialog.Title
                as='h2'
                className={twclsx(
                  'bg-clip-text text-transparent',
                  'bg-gradient-to-r from-primary-5 to-ternary-5'
                )}
              >
                {props.title}
              </Dialog.Title>

              <p className='max-w-prose my-2'>{props.message}</p>
              {props.children}

              <div className='flex items-center gap-4'>
                <ErrorButton onClick={props.onConfirm} className={twclsx('py-2.5 px-5')}>
                  Confirm
                </ErrorButton>
                <PrimaryButton onClick={props.onClose} className={twclsx('py-2.5 px-5')}>
                  Cancel
                </PrimaryButton>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ModalPrompt
