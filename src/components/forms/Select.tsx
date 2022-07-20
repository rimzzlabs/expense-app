import { twclsx } from '@/utils'

import { SelectOptionProps } from 'expense-app'
import { forwardRef } from 'react'

type CustomSelectProps = SelectOptionProps & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = forwardRef<HTMLSelectElement, CustomSelectProps>((props, ref) => (
  <select
    {...props}
    ref={ref}
    className={twclsx(
      'rounded-lg',
      'focus:border-primary-5',
      'focus:ring-primary-5',
      'bg-theme-2 dark:bg-theme-7 border-theme-4 dark:border-theme-6',
      'placeholder:text-theme-6 dark:placeholder:text-theme-4 placeholder:text-sm md:placeholder:text-base',
      props.className
    )}
  >
    {props.list.map((o, k) => (
      <option key={k} {...o}></option>
    ))}
  </select>
))

Select.displayName = 'Select'

export default Select
