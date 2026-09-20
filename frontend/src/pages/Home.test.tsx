import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from '../App'
import Home from './Home'

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  )
}

describe('Home', () => {
  it('renders the hero headline', () => {
    renderHome()

    expect(
      screen.getByRole('heading', { level: 1, name: 'Book time with specialists' }),
    ).toBeInTheDocument()
  })

  it('renders the hero subtitle and final call to action copy', () => {
    renderHome()

    expect(screen.getByText('Online sessions of 15 or 30 minutes.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Ready to book?' })).toBeInTheDocument()
  })

  it('pairs each duration with its description', () => {
    renderHome()

    expect(screen.getByText('Quick questions.').closest('div')).toHaveTextContent('15 min')
    expect(screen.getByText('In-depth sessions.').closest('div')).toHaveTextContent('30 min')
  })

  it('anchors the How it works button to the steps section', () => {
    renderHome()

    expect(screen.getByRole('link', { name: 'How it works' })).toHaveAttribute(
      'href',
      '#how-it-works',
    )
    expect(document.getElementById('how-it-works')).toBeInTheDocument()
  })

  it('points every Book call to action at /booking', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )

    const bookLinks = screen.getAllByRole('link', { name: 'Book' })
    expect(bookLinks.length).toBeGreaterThan(0)
    for (const link of bookLinks) {
      expect(link).toHaveAttribute('href', '/booking')
    }
  })

  it('lists the three booking steps', () => {
    renderHome()

    const steps = within(screen.getByRole('list'))
    for (const step of ['Pick a specialist', 'Choose a slot', 'Meet online']) {
      expect(steps.getByText(step)).toBeInTheDocument()
    }
  })

  it('opens the booking page when Book is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )

    await user.click(screen.getAllByRole('link', { name: 'Book' })[0]!)

    expect(await screen.findByRole('heading', { name: 'Coming soon' })).toBeInTheDocument()
  })
})
