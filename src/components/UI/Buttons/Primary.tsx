import { twclsx } from '@/utils'

import Button from './Button'

type PrimaryButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const Primary: React.FunctionComponent<PrimaryButtonProps> = (props) => (
  <Button
    {...props}
    className={twclsx(
      'border-primary-5 dark:border-primary-5 bg-primary-5 text-theme-1',
      'hover:bg-primary-6',
      props.className
    )}
  >
    {props.children}
  </Button>
)

export default Primary
