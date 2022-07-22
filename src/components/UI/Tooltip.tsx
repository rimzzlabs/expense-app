import React from 'react'
import { Tooltip as TippyTooltip, TooltipProps } from 'react-tippy'

type CustomToolTip = { children: React.ReactNode } & TooltipProps

const Tooltip: React.FunctionComponent<CustomToolTip> = ({ children, ...props }) => {
  return <TippyTooltip {...props}>{children}</TippyTooltip>
}

export default Tooltip
