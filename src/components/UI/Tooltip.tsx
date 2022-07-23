import { useMediaQuery, useTheme } from '@/hooks'

import React, { cloneElement } from 'react'
import { Tooltip as TippyTooltip, TooltipProps } from 'react-tippy'

type CustomToolTip = { children: React.ReactNode } & TooltipProps

const Tooltip: React.FunctionComponent<CustomToolTip> = ({ children, ...props }) => {
  const { theme } = useTheme()
  const isMatch = useMediaQuery('(min-width: 768px)')

  return cloneElement<CustomToolTip>(<TippyTooltip />, {
    ...props,
    inertia: true,
    disabled: !isMatch,
    children,
    theme
  })
}

export default Tooltip
