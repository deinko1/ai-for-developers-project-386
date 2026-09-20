# Bocal

A service where clients book online sessions with specialists: they pick a free time in a
specialist's calendar and see it in their own time zone.

## Language

**Specialist**:
A person who publishes their free time and holds sessions with clients.
_Avoid_: expert, consultant, coach, master

**Client**:
A person who books a session with a specialist and takes part in it.
_Avoid_: user, guest, customer

**Free time**:
An interval a specialist publishes as available for booking.
_Avoid_: availability window, availability, schedule

**Slot grid**:
A fixed set of possible start times inside a free time: the step equals the session
duration, starts are aligned to the hour.
_Avoid_: grid, timeslot

**Slot**:
A bookable interval inside a free time — 15 or 30 minutes, starting on the slot grid.
_Avoid_: window, interval

**Booking**:
The act by which a client takes a slot and thereby creates a session.
_Avoid_: reservation

**Session**:
An online conversation between a client and a specialist, created by a booking.
_Avoid_: meeting, call, appointment
