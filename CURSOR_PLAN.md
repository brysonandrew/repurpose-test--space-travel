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