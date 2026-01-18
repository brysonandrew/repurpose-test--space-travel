Agent 1 — Architecture & Decisions

You are a senior frontend engineer.
Read the assignment brief in SPEC.md. Decide:
	1.	URL strategy for steps (e.g. /wizard?step=1 or /wizard/step-1)
	2.	persistence approach to satisfy: back button + refresh preserves state
	3.	state management approach (useReducer? zustand? URL-only?)
	4.	component boundaries per step
	5.	testing strategy: unit vs component vs e2e

Output decisions + rationale only. No code.
Write to ARCHITECTURE.md.

What you’re aiming for (strong choice):
	•	Steps encoded in URL (/wizard/step-1 or ?step=1)
	•	Form state persisted in localStorage (simple + reliable)
	•	Core rules in pure lib/ functions

Agent 2 — Types + Validation 

Files allowed:
	•	src/lib/types.ts
	•	src/lib/validation.ts
	•	src/lib/validation.test.ts

Prompt:

Implement strict TypeScript domain types for Destination, Traveler, BookingDraft, BookingPayload.
Then write tests FIRST for cross-field validation:
	•	returnDate must be after departureDate
	•	travelers count 1–5
	•	traveler: fullName required, age integer 0–120 (choose sensible bounds and document)
Provide validateDraft(draft) returning a structured error object keyed by field.
After tests, implement validation. No React/Next usage.

Agent 3 — State/persistence engine

Files allowed:
	•	src/lib/storage.ts
	•	src/lib/wizardState.ts
	•	src/lib/wizardState.test.ts

Prompt:

Create a small “wizard state engine” with:
	•	initial state
	•	reducer/actions (setDestination, setDates, addTraveler, removeTraveler, updateTraveler, reset, etc.)
	•	persistence helpers: load/save to localStorage (with versioning + safe parse)

Write tests for reducer behavior and for storage parse safety.
Keep it framework-agnostic (no React hooks).

Agent 4 — Next API routes

Files allowed:
	•	src/app/api/destinations/route.ts
	•	src/app/api/bookings/route.ts
	•	src/lib/delay.ts

Prompt:

Implement Next.js App Router route handlers:
	•	GET /api/destinations returns the provided mock list
	•	POST /api/bookings validates payload shape minimally and returns {success:true, bookingId:"XYZ123"}
	•	Add artificial 1–2s delay in POST using delay(ms) helper
Keep everything typed, return correct status codes.
Do not touch UI.

Agent 5 — UI skeleton

Files allowed:
	•	src/app/page.tsx (or src/app/wizard/page.tsx)
	•	src/components/wizard/*
	•	src/components/ui/* (if needed)

Prompt:

Build a 3-step wizard UI using App Router.
Requirements:
	•	fetch destinations from /api/destinations
	•	step 1: destination + departure/return dates
	•	step 2: travelers 1–5 dynamic add/remove
	•	step 3: review + submit to /api/bookings
	•	prevent double-submit; loading state
	•	on success show bookingId

Use the reducer/state engine from src/lib/wizardState.ts and validation from src/lib/validation.ts (do not duplicate rules).
Persist draft state to localStorage and restore on load.
Ensure browser back works by using URL step state (?step= or route segments).
Keep components small and typed.

Agent 6 — Component tests (Testing Library + MSW)

Files allowed:
	•	src/components/wizard/*.test.tsx
	•	src/test/msw/* (handlers adjustments)
	•	src/test/setup.ts

Prompt:

Add Testing Library + MSW tests for the wizard:
	•	Step 1 validation blocks Next (returnDate before departureDate)
	•	Step 2 requires at least 1 traveler; cannot exceed 5
	•	Submit disables button + shows loading; on success shows bookingId

Tests should interact like a user (user-event) and assert visible behavior.
Prefer role/label queries. Avoid snapshots.

This gets you “quality tests” without the fragility of E2E everywhere.

Agent 7 — Playwright E2E (minimal but high impact)

Files allowed:
	•	playwright/*.spec.ts
	•	playwright.config.ts

Prompt:

Write 2–3 Playwright tests:
	1.	happy path end-to-end booking yields confirmation with bookingId
	2.	browser back navigates to previous step and preserves inputs
	3.	refresh on step 2 keeps state and step

Use role/label selectors. Avoid hard waits; assert on UI states.

Agent 8 — README (sell the senior choices)

Files allowed: README.md only.

Prompt:

Write a concise README with:
	•	install/run instructions
	•	architecture decisions (state, persistence, routing)
	•	testing strategy (unit/component/e2e) and why
	•	tradeoffs and what you’d do next with more time
Keep it honest and senior.

Include a line like:

“I prioritised testability and added a focused set of tests around the core booking flow and business rules.”

Cursor Agent Prompt — Visual Design Layer (Glassmorphism)

Scope (important):
This agent may only touch:
	•	src/components/ui/*
	•	src/components/wizard/*
	•	global styles (e.g. globals.css, Tailwind config if present)

It must not:
	•	change business logic
	•	change validation rules
	•	change routing or persistence

