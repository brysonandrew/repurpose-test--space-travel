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
