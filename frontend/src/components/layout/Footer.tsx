import { Link } from 'react-router'
import Container from '../Container'

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <Container className="flex items-center justify-between py-6 text-sm text-muted-foreground">
        <p>© 2026 Bocal</p>
        <Link
          to="/about"
          className="rounded-sm transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          About
        </Link>
      </Container>
    </footer>
  )
}

export default Footer
