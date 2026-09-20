import { Link } from 'react-router'
import BookCta from '../BookCta'
import Container from '../Container'

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          to="/"
          className="rounded-sm font-heading text-lg font-semibold tracking-tight transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          Bocal
        </Link>
        <BookCta size="sm" />
      </Container>
    </header>
  )
}

export default Header
