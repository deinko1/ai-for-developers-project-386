import BookCta from '../components/BookCta'
import Container from '../components/Container'
import SlotPickerMock from '../components/landing/SlotPickerMock'
import { buttonVariants } from '../components/ui/button'
import { cn } from '../lib/utils'

const steps = ['Pick a specialist', 'Choose a slot', 'Meet online']

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b from-primary/10 to-transparent"
      />
      <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Book time with specialists
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Online sessions, at a time that works for you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BookCta />
            <a
              href="#how-it-works"
              className={cn(buttonVariants({ variant: 'outline' }), 'h-10 px-5')}
            >
              How it works
            </a>
          </div>
        </div>
        <SlotPickerMock />
      </Container>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20">
      <Container className="py-16 sm:py-24">
        <h2 className="font-heading text-3xl font-semibold tracking-tight">How it works</h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step} className="relative flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-4.25 left-1/2 hidden h-0.5 w-[calc(100%+2rem)] bg-border sm:block"
                />
              )}
              <span className="relative flex size-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                {index + 1}
              </span>
              <p className="mt-4 font-medium">{step}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="border-t border-border/60 bg-primary/5">
      <Container className="flex flex-col items-center gap-6 py-16 text-center sm:py-20">
        <h2 className="font-heading text-3xl font-semibold tracking-tight">Ready to book?</h2>
        <BookCta />
      </Container>
    </section>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FinalCta />
    </>
  )
}

export default Home
