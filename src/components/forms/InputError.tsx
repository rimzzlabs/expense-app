import { createElement } from 'react'

type InputErrorProps = {
  msg: string
}

const InputError: React.FunctionComponent<InputErrorProps> = ({ msg }) =>
  createElement('span', { className: 'text-sm text-error-2 dark:text-error-1' }, msg)

export default InputError
