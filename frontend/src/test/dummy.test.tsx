import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

// Bootstrap test: proves jsdom, React Testing Library and the jest-dom matchers
// are wired up. Replace with real feature tests as features land.
describe('test harness', () => {
  it('renders a component into jsdom', () => {
    render(<p>ok</p>)

    expect(screen.getByText('ok')).toBeInTheDocument()
  })
})
