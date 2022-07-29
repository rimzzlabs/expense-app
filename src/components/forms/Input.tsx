import { Button } from '@/components'

import { twclsx } from '@/utils'

import { createElement, forwardRef, useCallback, useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', className: c, ...props }, ref) => {
    const [isEyeOn, setEye] = useState(false)
    const toggleEye = useCallback(() => setEye((prev) => !prev), [])

    const className = twclsx(
      'rounded-lg',
      'focus:border-primary-5',
      'focus:ring-primary-5',
      'bg-theme-2 dark:bg-theme-7 border-theme-4 dark:border-theme-6',
      'placeholder:text-theme-6 dark:placeholder:text-theme-4 placeholder:text-sm md:placeholder:text-base',
      c
    )

    if (type !== 'password') {
      return createElement('input', { ...props, ref, autoComplete: 'off', className, type })
    }

    return (
      <div className='relative'>
        <input
          ref={ref}
          autoComplete='off'
          type={isEyeOn ? 'text' : 'password'}
          className={className + ' w-full pr-10'}
          {...props}
        />

        <Button
          type='button'
          onClick={toggleEye}
          className={twclsx(
            'absolute right-1 inset-y-1',
            'inline-flex items-center justify-center',
            'w-10 rounded-lg'
          )}
        >
          {isEyeOn ? <HiEye /> : <HiEyeOff />}
        </Button>
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
