import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Booking from './Booking'

describe('Booking', () => {
  it('renders the coming soon stub', () => {
    render(<Booking />)

    expect(screen.getByRole('heading', { name: 'Coming soon' })).toBeInTheDocument()
  })
})
