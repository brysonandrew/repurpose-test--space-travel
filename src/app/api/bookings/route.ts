import { NextResponse } from 'next/server';
import { delay } from '@/lib/delay';

interface BookingPayload {
  destinationId: string;
  travelers: number;
  date: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function isValidPayload(payload: any): payload is BookingPayload {
  return (
    typeof payload === 'object' &&
    typeof payload.destinationId === 'string' &&
    typeof payload.travelers === 'number' &&
    typeof payload.date === 'string'
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
