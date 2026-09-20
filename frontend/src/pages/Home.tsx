import { useEffect, useState } from 'react'

type Health = {
  status: string
  service: string
  time: string
}

function Home() {
  const [health, setHealth] = useState<Health | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/v1/health')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        return response.json() as Promise<Health>
      })
      .then(setHealth)
      .catch((cause: unknown) => {
        setError(cause instanceof Error ? cause.message : String(cause))
      })
  }, [])

  return (
    <section>
      <h1>Календарь звонков</h1>
      <p>Rails API + Vite + React bootstrap.</p>

      <h2>Backend status</h2>
      {error && <p role="alert">API error: {error}</p>}
      {!error && !health && <p>Checking API…</p>}
      {health && (
        <p>
          API: <strong>{health.status}</strong> ({health.service}, {health.time})
        </p>
      )}
    </section>
  )
}

export default Home
