import { BookingDraft } from './types';

export type WizardAction =
  | { type: 'setDestination'; destinationId: string }
  | { type: 'setDates'; departureDate: string; returnDate: string }
  | { type: 'addTraveler' }
  | { type: 'removeTraveler'; index: number }
  | { type: 'updateTraveler'; index: number; traveler: Partial<BookingDraft['travelers'][number]> }
  | { type: 'reset' };

export type WizardState = BookingDraft;

export const initialWizardState: WizardState = {
  destinationId: '',
  departureDate: '',
  returnDate: '',
  travelers: [
    {
      fullName: '',
      age: undefined,
    },
  ],
};

export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'setDestination':
      return { ...state, destinationId: action.destinationId };
    case 'setDates':
      return { ...state, departureDate: action.departureDate, returnDate: action.returnDate };
    case 'addTraveler':
      if (state.travelers.length >= 5) return state;
      return { ...state, travelers: [...state.travelers, { fullName: '', age: undefined }] };
    case 'removeTraveler':
      if (state.travelers.length <= 1) return state;
      return {
        ...state,
        travelers: state.travelers.filter((_, i) => i !== action.index),
      };
    case 'updateTraveler': {
      const travelers = state.travelers.map((trav, idx) =>
        idx === action.index ? { ...trav, ...action.traveler } : trav,
      );
      return { ...state, travelers };
    }
    case 'reset':
      return initialWizardState;
    default:
      return state;
  }
}

// Persistence helpers (versioned)
const STORAGE_KEY = 'wizard_draft_v1';

export function saveWizardDraft(state: WizardState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore write errors
  }
}

export function loadWizardDraft(): WizardState | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as WizardState;
  } catch {
    return undefined;
  }
}

export function clearWizardDraft() {
  localStorage.removeItem(STORAGE_KEY);
}
