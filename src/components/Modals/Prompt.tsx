import { ErrorButton, Modal, PrimaryButton } from '@/components'

import { twclsx } from '@/utils'

import { Prompt } from 'expense-app'

const ModalPrompt: React.FunctionComponent<Prompt> = (props) => {
  return (
    <Modal className='max-w-lg' onClose={props.onClose} show={props.isOpen} title={props.title}>
      <p className='max-w-prose mt-2 mb-6'>{props.message}</p>
      {props.children}

      <div className='flex items-center gap-4'>
        <ErrorButton onClick={props.onConfirm} className={twclsx('py-2.5 px-5')}>
          Confirm
        </ErrorButton>
        <PrimaryButton onClick={props.onClose} className={twclsx('py-2.5 px-5')}>
          Cancel
        </PrimaryButton>
      </div>
    </Modal>
  )
}

export default ModalPrompt
