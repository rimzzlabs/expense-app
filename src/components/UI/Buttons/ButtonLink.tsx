import { twclsx } from '@/utils'

import { createElement } from 'react'
import { Link, LinkProps } from 'react-router-dom'

type ButtonLinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> &
  LinkProps

const ButtonLink: React.FunctionComponent<ButtonLinkProps> = ({ className: c, ...props }) => {
  const className = twclsx(
    'inline-flex items-center justify-center',
    'font-semibold py-2.5 px-4 rounded-lg transition-all',
    'bg-primary-5 text-theme-1',
    'hover:bg-primary-6 ring-primary-5 dark:ring-primary-4',
    'focus-visible:ring',
    c
  )

  if (typeof props.to === 'string' && props.to.startsWith('http')) {
    return createElement('a', { ...props, target: '_blank', rel: 'noopener noreferrer', className })
  }

  return (
    <Link to={props.to} className={className}>
      {props.children}
    </Link>
  )
}

export default ButtonLink
