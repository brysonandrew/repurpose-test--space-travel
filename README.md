This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Booking Wizard Architecture Decisions

### 1. URL Strategy for Steps

- **Decision:** Use path-based URLs for wizard steps, e.g. `/wizard/step-1`, `/wizard/step-2`, `/wizard/step-3`
- **Rationale:**
  - Path parameters express hierarchy and are more readable/bookmarkable than query params for step-based flows.
  - Works seamlessly with Next.js App Router segment-based routing, which cleanly maps step UI to pages.
  - Makes it trivial for the browser back button to move to previous steps without custom code.

### 2. State Persistence (Back Button & Refresh)

- **Decision:** Use `localStorage` to persist booking form state (all steps).
- **Rationale:**
  - LocalStorage is simple, reliable, and survives page refreshes and browser restarts.
  - Each step reads/writes only its relevant slice, but submits the combined state.
  - The state is also reflected in the URL (current step), making navigation predictable and robust.
  - This approach de-couples UI navigation from form data, maximizing resilience to accidental reloads or partial step revisits.

### 3. State Management Approach

- **Decision:** Use `useReducer` (React) for in-memory wizard state, with sync to `localStorage` on change.
- **Rationale:**
  - Keeps state easily testable, predictable, and isolated to the wizard, without added complexity of third-party stores.
  - `useReducer` is ideal for multi-step wizards with explicit state transitions and cross-field validation.
  - Pure state transition logic is placed in `lib/formReducer.ts` (or equivalent), making it easy to test and reuse outside React.

### 4. Component Boundaries (Per Step)

- **Decision:**
  - Each wizard step is its own component (e.g. `<DestinationStep />`, `<TravelersStep />`, `<ReviewStep />`)
  - A top-level `<BookingWizard />` component handles routing and orchestrates state/context.
  - Core UI elements for destinations, traveler forms, review summary, and confirmation are reusable subcomponents.
- **Rationale:**
  - Step isolation enforces clarity and maintainability.
  - Clear boundaries enable focused unit and integration tests.
  - Promotes SRP (single responsibility principle) and simplifies future extensibility.

### 5. Testing Strategy (Unit vs Component vs E2E)

- **Decision:**
  - **Unit tests**: All validation and state logic (reducers, validators) tested in isolation.
  - **Component tests**: Each wizard step as a component with React Testing Library/Playwright Component.
  - **E2E tests**: Full wizard flow (happy path, edge cases, persistence) with Playwright.
- **Rationale:**
  - Tests at all levels ensure correctness, reduce regressions, and enable safe refactoring.
  - E2E tests are essential for verifying navigation (back button, refresh) and user journeys.
  - Pure logic in `lib/` enables fast headless unit tests independent of UI.

---

**Summary:**

- URL reflects wizard step in the path (`/wizard/step-1`, etc.).
- All form state persisted in localStorage and managed in-memory with useReducer.
- Wizard decomposed into per-step components and pure logic helpers for rules/validation.
- Comprehensive tests: unit (logic), component (UI), e2e (user flow, nav, persistence).

## Short description of approach (process, tools used)

I implemented this as a small, testable React wizard with three steps (Destination → Travelers → Review/Submit), keeping state and validation centralized so each step stays mostly “dumb” and easy to reason about.

Tools / libraries

- React + TypeScript
- Vite + Vitest
- React Testing Library + user-event
- Tailwind CSS for styling

AI Used

- Cursor (macro)
- ChatGPT (micro)

Intial Outline 1. Architecture & Decisions 2. Types + Validation 3. State / Persistence Engine 4. Next API Routes 5. UI Skeleton 6. Component Tests 7. Playwright E2E

Process

- Skimmed the requirements and identified the key states/transitions (step navigation, validation gates, submit lifecycle).
- Built the UI step-by-step, wiring state + validation early so the “Next” / “Back” behaviour matched the spec from the start.
- Added unit tests alongside the steps to lock in behaviour (date validation, traveler min/max, submit loading/success).
- Iterated on accessibility and testability (semantic headings/roles, predictable labels, stable selectors when needed).
- Made sure tests pass
- Went through the wizard several times to test UX
- Checked responsiveness of viewport
- Removed AI artifacts, dead code and unused components

## Feedback on the assignment (optional)

It was a well-scoped, meaningful test for a coder's Next.js ability.

## If I had more time

- Increase test coverage, focusing on integration and failure states
- Standardise icons using SVGs for better scalability and styling control
- Refactor form state management to react-hook-form for improved performance and maintainability
- Add dark mode support using a token-based theming approach
