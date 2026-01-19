# Intergalactic Travel Agency 🚀

## Code Assignment for Senior Frontend Developer

### Assignment Objective

The objective of this assignment is to shows us the best, cleanest, most production-ready, high quality code you can delivery with modern tools. This is your code-level business card.

### Use Any Tools

You're encouraged to use AI tooling (Claude Code, Cursor, Copilot, etc.), component libraries, documentation, or whatever you'd use in production. We're evaluating the output, not the process. And we want you to work in the same environment you would at repurpose - which is AI heavy.

---

### The Situation

It's 2147. Humanity has colonized the solar system, and **Intergalactic Travel Agency** is the budget airline of space tourism. You've been hired to build their booking wizard.

The previous developer left abruptly (something about a one-way ticket to Europa). The backend team has provided API endpoints, but the frontend is yours to build from scratch.

---

### What You're Building

A **3-step booking wizard**:

#### Step 1: Destination

- Fetch and display available destinations from the API
- Show each destination's name, distance, and travel time
- User selects one destination
- User picks departure date and return date

#### Step 2: Travelers

- Add between 1-5 travelers
- Each traveler requires: full name and age
- Ability to add/remove travelers dynamically

#### Step 3: Review & Confirm

- Display complete booking summary (destination details, dates, all travelers)
- Submit button posts to the bookings API
- Show confirmation with booking ID on success

Simple on the surface — but the devil's in the details.

---

### Technical Requirements

- **Next.js 14+** with App Router
- **TypeScript** in strict mode
- **React 18+**

---

### API Endpoints

Implement these as Next.js API routes. We've provided the mock data below — your endpoints should return it.

#### `GET /api/destinations`

```json
[
  {
    "id": "mars",
    "name": "Mars",
    "distance": "225M km",
    "travelTime": "7 months"
  },
  {
    "id": "europa",
    "name": "Europa",
    "distance": "628M km",
    "travelTime": "2 years"
  },
  {
    "id": "titan",
    "name": "Titan",
    "distance": "1.2B km",
    "travelTime": "4 years"
  },
  {
    "id": "luna",
    "name": "Luna (Moon)",
    "distance": "384K km",
    "travelTime": "3 days"
  }
]
```

#### `POST /api/bookings`

Accepts the completed booking.

```json
{
  "destinationId": "mars",
  "departureDate": "2025-06-01",
  "returnDate": "2026-01-01",
  "travelers": [
    { "fullName": "John Doe", "age": 32 },
    { "fullName": "Jane Smith", "age": 28 }
  ]
}
```

Returns `{ success: true, bookingId: "XYZ123" }`.

**Important:** Add a 1-2 second artificial delay to this endpoint to simulate real-world latency. This matters for UX testing.

---

### Functional Requirements

| Requirement                | Details                                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Cross-field validation** | Return date must be after departure date. At least one traveler required.                                                    |
| **Back button behavior**   | Browser back button should navigate to previous step with form state preserved. Refresh should not lose current step's data. |
| **Submission UX**          | Handle loading state, prevent double-submit, show confirmation on success.                                                   |

---

### Deliverables

1. **Source code** via GitHub repo or zip file
2. **README** with:
   - How to install and run locally
   - Brief explanation of key design decisions (especially around state management and component structure)
   - Short description of your approach (process, tools used)
   - Feedback on this assignment (optional but appreciated)

---

### Time Expectation

Approximately **3-4 hours**. If it takes longer, feel free to stop and note what's left in the README. But make sure that whatever you delivery satisfies your high standard and the evaluation criteria below. A well-structured partial solution beats a messy complete one.

---

### Evaluation Criteria

| Area                      | What We're Looking For                                                          |
| ------------------------- | ------------------------------------------------------------------------------- |
| **Correctness**           | Wizard works end-to-end, validation behaves correctly                           |
| **Visual design**         | Clean, responsive, pragmatic UX/UI                                              |
| **Production Level**      | All aspects of production-ready code are covered, functional and non-functional |
| **Architecture & Design** | Clear separation of concerns, appropriate abstractions                          |
| **State Management**      | Clean data flow, balance between local and shared                               |
| **Tech choices**          | Appropriate tool for the job with the right reasons                             |
| **Navigation & Flow**     | Back button works, state survives refresh, URLs make sense                      |
| **Code Quality**          | Readable, well-named, idiomatic TypeScript, Clean Code                          |
| **Overall Quality**       | All aspects of the deliverable have been quality assured                        |
| **Changeability**         | How easy it is clean up, refactor, and evolve this code                         |
| **Pragmatism**            | No over-engineering, sensible trade-offs                                        |

---

### What We're NOT Evaluating

- Deployment

---

### Questions?

Make reasonable assumptions and document them. Real-world specs are never perfect.

Good luck — and remember, no refunds once you've left Earth's atmosphere. 🌍
