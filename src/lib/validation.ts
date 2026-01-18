import { BookingDraft, ValidationErrors } from './types';

// Validates a booking draft, returning a structured error object keyed by field
export function validateDraft(draft: BookingDraft): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!draft.destinationId) {
    errors.destinationId = 'Destination is required.';
  }
  if (!draft.departureDate) {
    errors.departureDate = 'Departure date is required.';
  }
  if (!draft.returnDate) {
    errors.returnDate = 'Return date is required.';
  }
  if (draft.departureDate && draft.returnDate) {
    if (draft.returnDate <= draft.departureDate) {
      errors.returnDate = 'Return date must be after departure date.';
    }
  }

  if (!Array.isArray(draft.travelers) || draft.travelers.length < 1 || draft.travelers.length > 5) {
    errors.travelersCount = 'You must add between 1 and 5 travelers.';
  }

  errors.travelers = draft.travelers.map((trav) => {
    const sub: { fullName?: string; age?: string } = {};
    if (!trav.fullName) {
      sub.fullName = 'Full name required.';
    }
    if (
      trav.age === undefined ||
      typeof trav.age !== 'number' ||
      isNaN(trav.age) ||
      trav.age < 0 ||
      trav.age > 120
    ) {
      sub.age = 'Age must be between 0 and 120.';
    }
    return sub;
  });

  // Remove empty traveler errors
  if (errors.travelers.every((err) => Object.keys(err).length === 0)) {
    delete errors.travelers;
  }

  return errors;
}
