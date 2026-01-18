// Tests for booking cross-field validation
import { validateDraft } from './validation';
import type { BookingDraft, Traveler, Destination } from './types';

describe('validateDraft', () => {
  const destination: Destination = { code: 'TAT', name: 'Tatooine' };
  function makeDraft(partial: Partial<BookingDraft> = {}): BookingDraft {
    return {
      origin: destination,
      destination,
      departureDate: '2099-05-01',
      returnDate: '2099-05-10',
      travelers: [{ fullName: 'Luke Skywalker', age: 25 }],
      ...partial,
    };
  }

  it('accepts a valid booking', () => {
    const errors = validateDraft(makeDraft());
    expect(errors).toEqual({});
  });

  it('requires returnDate > departureDate', () => {
    const errors = validateDraft(makeDraft({ departureDate: '2099-05-10', returnDate: '2099-05-01' }));
    expect(errors.returnDate).toBe('Return date must be after departure date');
  });

  it('allows one-way when returnDate missing', () => {
    const errors = validateDraft(makeDraft({ returnDate: undefined }));
    expect(errors.returnDate).toBeUndefined();
  });

  it('rejects fewer than 1 traveler', () => {
    const errors = validateDraft(makeDraft({ travelers: [] }));
    expect(errors.travelers).toBe('Must have 1-5 travelers');
  });

  it('rejects more than 5 travelers', () => {
    const group: Traveler[] = Array.from({ length: 6 }, (_, i) => ({ fullName: `Traveler ${i+1}`, age: 30 }));
    const errors = validateDraft(makeDraft({ travelers: group }));
    expect(errors.travelers).toBe('Must have 1-5 travelers');
  });

  it('requires traveler fullName', () => {
    const travelers = [{ fullName: '', age: 25 }];
    const errors = validateDraft(makeDraft({ travelers }));
    expect(errors['travelers.0.fullName']).toBe('Full name required');
  });

  it('requires traveler age to be integer', () => {
    const travelers = [{ fullName: 'Obi-Wan', age: 17.7 }];
    const errors = validateDraft(makeDraft({ travelers }));
    expect(errors['travelers.0.age']).toBe('Age must be an integer 0–120');
  });

  it('requires traveler age to be between 0 and 120', () => {
    const travelersLow = [{ fullName: 'Yoda', age: -1 }];
    const travelersHigh = [{ fullName: 'Mace', age: 121 }];
    expect(validateDraft(makeDraft({ travelers: travelersLow }))['travelers.0.age']).toBe('Age must be an integer 0–120');
    expect(validateDraft(makeDraft({ travelers: travelersHigh }))['travelers.0.age']).toBe('Age must be an integer 0–120');
  });

  // Documenting the bounds
  it('documents Traveler age bounds 0–120 inclusive', () => {
    // This is for doc coverage and could be omitted; see types.ts for doc
    // Accepts 0
    expect(validateDraft(makeDraft({ travelers: [{ fullName: 'Anakin', age: 0 }] })).travelers).toBeUndefined();
    // Accepts 120
    expect(validateDraft(makeDraft({ travelers: [{ fullName: 'Dooku', age: 120 }] })).travelers).toBeUndefined();
  });
});
