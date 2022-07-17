import { twclsx } from '@/utils'

import Button from './Button'

type ErrorButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const Error: React.FunctionComponent<ErrorButtonProps> = (props) => (
  <Button
    {...props}
    className={twclsx(
      'border-error-2 dark:border-error-2 bg-error-2 text-theme-1',
      'hover:bg-error-3 ring-theme-3 dark:ring-theme-6',
      props.className
    )}
  >
    {props.children}
  </Button>
)

export default Error
