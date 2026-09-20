# One account with a role for Clients and Specialists

Client and Specialist are different roles in the domain, but a single account: we store one `User`
with a role field (`client` / `specialist`) rather than two independent entities. Reasons:
authentication, profile (name, email, time zone) and account lifecycle are the same for both, and
one person can potentially act in both roles; two tables would duplicate all of that and complicate
switching roles.

The domain language still keeps separate words — **Client** and **Specialist**;
"User" denotes only the account.

## Considered Options

- **Two entities (`Client`, `Specialist`)** — separates the domains more cleanly, but duplicates
  authentication and forces a decision about what to do when a person is in both roles.
- **One account without an explicit role** — flexible, but overkill for the MVP and it makes the
  "all specialists" query implicit.

## Consequences

Selecting specialists is `User.specialist`; access to the calendar and to publishing free time is
checked by role, not by entity type.
