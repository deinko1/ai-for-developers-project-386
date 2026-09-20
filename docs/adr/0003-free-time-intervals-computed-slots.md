# Free time is stored as intervals, slots are computed

A specialist publishes free time as wide intervals, and concrete slots are not stored: they are
computed from free time, booked sessions, the duration of the specialist's meeting type and the
slot grid. The alternative — pre-slicing slots when free time is saved — would force the specialist
to keep a separate slicing for each duration and recompute it on every edit, and two slicings of
the same time inevitably drift apart.

## Considered Options

- **Pre-sliced slots** — faster to read, but duplicate data and require rebuilding on every edit of
  free time or new booking.
- **Computation on the fly** — chosen: the single source of truth is free time and sessions.

## Consequences

Slots have no identifier of their own in the database; a booking relies on the start moment and
duration. Overlaps are checked against the specialist's sessions; there is no buffer between
sessions in the MVP.
