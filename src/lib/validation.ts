import type { BookingDraft } from './types';

// Returns: { [field]: string }
export function validateDraft(draft: BookingDraft): Record<string, string> {
  const errors: Record<string, string> = {};

  // Return date after departure date (if present)
  if (
    draft.returnDate &&
    draft.departureDate &&
    new Date(draft.returnDate) <= new Date(draft.departureDate)
  ) {
    errors.returnDate = 'Return date must be after departure date';
  }

  // Travelers count (1–5)
  if (!Array.isArray(draft.travelers) || draft.travelers.length < 1 || draft.travelers.length > 5) {
    errors.travelers = 'Must have 1-5 travelers';
  }

  // Validate travelers fields
  if (Array.isArray(draft.travelers)) {
    draft.travelers.forEach((trav, i) => {
      if (!trav.fullName || typeof trav.fullName !== 'string' || trav.fullName.trim() === '') {
        errors[`travelers.${i}.fullName`] = 'Full name required';
      }
      if (
        typeof trav.age !== 'number' ||
        !Number.isInteger(trav.age) ||
        trav.age < 0 ||
        trav.age > 120
      ) {
        errors[`travelers.${i}.age`] = 'Age must be an integer 0–120';
      }
    });
  }

  return errors;
}
