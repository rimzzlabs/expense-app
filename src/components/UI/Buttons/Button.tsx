import { twclsx } from '@/utils'

import { createElement } from 'react'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const Button: React.FunctionComponent<ButtonProps> = ({ className: c, ...props }) => {
  const className = twclsx(
    'inline-flex items-center justify-center',
    'rounded-lg border border-theme-3 dark:border-theme-7',
    'outline-none transition-all',
    'focus-visible:ring',
    c
  )
  return createElement('button', { ...props, className })
}

export default Button
