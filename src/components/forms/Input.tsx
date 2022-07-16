import { twclsx } from '@/utils'

import { createElement } from 'react'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FunctionComponent<InputProps> = ({ type = 'text', className: c, ...props }) => {
  const className = twclsx(
    'rounded-lg',
    'focus:border-primary-5',
    'focus:ring-primary-5',
    'bg-theme-2 dark:bg-theme-7 border-theme-4 dark:border-theme-6',
    'placeholder:text-theme-6 dark:placeholder:text-theme-4',
    c
  )
  return createElement('input', { ...props, autoComplete: 'off', className, type })
}

export default Input
