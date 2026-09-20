import { Link } from 'react-router'
import { cn } from '../lib/utils'
import { buttonVariants } from './ui/button'

type BookCtaSize = 'sm' | 'md'

const sizeClasses: Record<BookCtaSize, string> = {
  sm: 'h-9 px-4',
  md: 'h-10 px-5',
}

type BookCtaProps = {
  size?: BookCtaSize
}

/**
 * The primary call to action. It renders a real link rather than the shadcn
 * `Button`, so the anchor keeps link semantics for navigation; `buttonVariants`
 * gives it the button look. The size overrides counter base-nova's compact
 * default sizes.
 */
function BookCta({ size = 'md' }: BookCtaProps) {
  return (
    <Link to="/booking" className={cn(buttonVariants(), sizeClasses[size])}>
      Book
    </Link>
  )
}

export default BookCta
