import { durations } from '../../lib/durations'
import { cn } from '../../lib/utils'

type SlotState = 'available' | 'selected' | 'unavailable'

type MockSlot = {
  time: string
  state: SlotState
}

const slots: MockSlot[] = [
  { time: '09:00', state: 'available' },
  { time: '09:30', state: 'available' },
  { time: '10:00', state: 'selected' },
  { time: '10:30', state: 'available' },
  { time: '11:00', state: 'available' },
  { time: '11:30', state: 'unavailable' },
]

const slotStateClasses: Record<SlotState, string> = {
  available: 'border-border text-foreground',
  selected: 'border-primary bg-primary text-primary-foreground',
  unavailable: 'border-border/60 text-muted-foreground/50 line-through',
}

/**
 * Decorative, CSS-only mock of a slot picker for the hero. It is `aria-hidden`
 * because it illustrates the product rather than offering a real control.
 */
function SlotPickerMock() {
  return (
    <div aria-hidden="true" className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium">Choose a slot</p>
        <div className="flex rounded-full border border-border p-0.5 text-xs">
          {durations.map((duration, index) => (
            <span
              key={duration.label}
              className={cn(
                'rounded-full px-3 py-1',
                index === durations.length - 1
                  ? 'bg-primary font-medium text-primary-foreground'
                  : 'text-muted-foreground',
              )}
            >
              {duration.label}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 text-sm">
        {slots.map((slot) => (
          <span
            key={slot.time}
            className={cn('rounded-md border px-3 py-2 text-center', slotStateClasses[slot.state])}
          >
            {slot.time}
          </span>
        ))}
      </div>
    </div>
  )
}

export default SlotPickerMock
