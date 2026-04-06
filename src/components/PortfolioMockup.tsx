import type { ReactNode } from 'react'
import { ui } from '../ui/classes'

/** Single soft frame — depth from shadow only; radius matches cards site-wide. */
export function PortfolioMockup(props: {
  children: ReactNode
  className?: string
  innerClassName?: string
}) {
  const { children, className = '', innerClassName = '' } = props
  return (
    <div className={`${ui.mockupFrame} ${className}`}>
      {innerClassName ? <div className={innerClassName}>{children}</div> : children}
    </div>
  )
}
