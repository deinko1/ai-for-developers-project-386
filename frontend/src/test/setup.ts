import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Vitest runs without globals, so React Testing Library cannot register its
// automatic cleanup hook itself. Do it here instead.
afterEach(cleanup)
