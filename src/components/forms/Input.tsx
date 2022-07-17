import { twclsx } from '@/utils'

import { createElement, forwardRef } from 'react'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', className: c, ...props }, ref) => {
    const className = twclsx(
      'rounded-lg',
      'focus:border-primary-5',
      'focus:ring-primary-5',
      'bg-theme-2 dark:bg-theme-7 border-theme-4 dark:border-theme-6',
      'placeholder:text-theme-6 dark:placeholder:text-theme-4 placeholder:text-sm md:placeholder:text-base',
      c
    )
    return createElement('input', { ...props, ref, autoComplete: 'off', className, type })
  }
)

Input.displayName = 'Input'

export default Input
