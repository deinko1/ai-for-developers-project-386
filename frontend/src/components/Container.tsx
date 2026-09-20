import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

type ContainerProps = {
  className?: string
  children: ReactNode
}

/**
 * Horizontal page gutter: centres content and keeps one max width. Callers add
 * their own vertical rhythm and grid via `className`.
 */
function Container({ className, children }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-5xl px-4', className)}>{children}</div>
}

export default Container
