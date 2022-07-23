import { twclsx } from '@/utils'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export type ModalProps = {
  show: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
  className?: string
}

const Modal: React.FunctionComponent<ModalProps> = (props) => {
  return (
    <Transition as={Fragment} show={props.show}>
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
              '[@supports(backdrop-filter:blur(0))]:bg-theme-1/50',
              '[@supports(backdrop-filter:blur(0))]:dark:bg-theme-8/50'
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
                'w-11/12 p-6 lg:p-8 rounded-lg shadow-lg',
                'bg-theme-1 dark:bg-theme-7',
                props.className
              )}
            >
              <Dialog.Title
                as='h3'
                className={twclsx(
                  'bg-clip-text text-transparent dark:text-transparent',
                  'bg-gradient-to-r from-primary-5 to-ternary-5'
                )}
              >
                {props.title}
              </Dialog.Title>

              {props.children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
