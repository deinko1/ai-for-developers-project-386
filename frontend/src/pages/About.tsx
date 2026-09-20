import Container from '../components/Container'

function About() {
  return (
    <Container className="max-w-3xl py-16">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">About</h1>
      <p className="mt-4 text-muted-foreground">
        Bocal is a Hexlet learning project: a service for booking online sessions with specialists.
      </p>
    </Container>
  )
}

export default About
