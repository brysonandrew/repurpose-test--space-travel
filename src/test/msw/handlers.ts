import { http, HttpResponse } from 'msw';

const destinations = [
  { id: 'mars', name: 'Mars', distance: '225M km', travelTime: '7 months' },
  { id: 'europa', name: 'Europa', distance: '628M km', travelTime: '2 years' },
  { id: 'titan', name: 'Titan', distance: '1.2B km', travelTime: '4 years' },
  { id: 'luna', name: 'Luna (Moon)', distance: '384K km', travelTime: '3 days' },
] as const;

export const handlers = [
  http.get('/api/destinations', async () => {
    return HttpResponse.json(destinations);
  }),

  http.post('/api/bookings', async () => {
    // keep tests fast; don’t actually delay here
    // (your real API route will delay)
    return HttpResponse.json({ success: true, bookingId: 'XYZ123' });
  }),
];
