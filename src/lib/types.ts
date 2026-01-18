// Domain types for booking wizard

export interface Destination {
  id: string;
  name: string;
  description: string;
}

export interface Traveler {
  fullName: string;
  age?: number;
}

export interface BookingDraft {
  destinationId: string;
  departureDate: string;
  returnDate: string;
  travelers: Traveler[];
}

export interface BookingPayload extends BookingDraft {}

export interface ValidationErrors {
  destinationId?: string;
  departureDate?: string;
  returnDate?: string;
  travelers?: Array<{
    fullName?: string;
    age?: string;
  }>;
  travelersCount?: string;
}
