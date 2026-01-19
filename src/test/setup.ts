import '@testing-library/jest-dom/vitest';
import { vi, afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '@/test/msw/server';

vi.mock('next/navigation', () => {
  const push = vi.fn();
  const replace = vi.fn();
  const back = vi.fn();
  const forward = vi.fn();
  const refresh = vi.fn();
  const prefetch = vi.fn();

  return {
    useRouter: () => ({ push, replace, back, forward, refresh, prefetch }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
    useParams: () => ({}),
    redirect: vi.fn(),
    notFound: vi.fn(),
  };
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
