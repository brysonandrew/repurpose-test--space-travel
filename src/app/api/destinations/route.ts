import { NextResponse } from 'next/server';

const MOCK_DESTINATIONS = [
  { id: 'mars', name: 'Mars Colony' },
  { id: 'moon', name: 'Lunar Base' },
  { id: 'titan', name: 'Titan Outpost' }
];

export async function GET() {
  return NextResponse.json(MOCK_DESTINATIONS, { status: 200 });
}
