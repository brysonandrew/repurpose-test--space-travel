import { NextResponse } from 'next/server';
import { delay } from '@/lib/delay';

interface BookingPayload {
  destinationId: string;
  travelers: number;
  returnDate: string;
  departureDate: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function isValidPayload(payload: any): payload is BookingPayload {
  return (
    typeof payload === 'object' &&
    typeof payload.destinationId === 'string' &&
    Array.isArray(payload.travelers) &&
    typeof payload.returnDate === 'string' &&
    typeof payload.departureDate === 'string'
  );
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: 'Invalid payload' },
      { status: 400 }
    );
  }
  // Artificial delay: 1000-2000 ms
  await delay(1000 + Math.floor(Math.random() * 1000));
  return NextResponse.json(
    { success: true, bookingId: 'XYZ123' },
    { status: 200 }
  );
}
