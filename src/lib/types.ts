// Domain types for the Intergalactic Booking Wizard.

// --- Destination ---
// Example could be more complex later, but for now:
export interface Destination {
  code: string; // Airport or planet code, required
  name: string; // Readable name
}

// --- Traveler ---
export interface Traveler {
  fullName: string; // Required, non-empty
  age: number; // Integer, 0-120 inclusive
  // You can add more fields (e.g., passport info) as needed
}

// --- BookingDraft ---
export interface BookingDraft {
  origin: Destination;
  destination: Destination;
  departureDate: string;   // ISO-8601 string, required
  returnDate?: string;     // ISO-8601 string, optional
  travelers: Traveler[];   // 1–5 travelers
}

// --- BookingPayload ---
export interface BookingPayload extends BookingDraft {
  id: string;             // Server-generated booking id
  createdAt: string;     // ISO-8601
}
