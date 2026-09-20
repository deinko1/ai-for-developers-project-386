# Time is stored in UTC and shown in the viewer's zone

All moments in time are stored in UTC, and zones as IANA identifiers (`Europe/Moscow`), not as
offsets. A specialist publishes free time in the zone from their profile; a client sees slots in
the browser zone and in the MVP cannot switch it manually.

## Considered Options

- **Store the specialist's local time** — simpler on paper, but breaks as soon as the client is in
  another zone, and when daylight saving time changes.
- **Store the offset (`+03:00`)** — shorter, but a daylight saving time change turns the stored
  offset into the wrong one.
- **Manual zone switching by the client** — deferred: in the MVP the zone comes from the browser.

## Consequences

The specialist's zone is a required profile field. Any time serialization is UTC ISO 8601;
conversion to the viewer's zone happens on the client.
