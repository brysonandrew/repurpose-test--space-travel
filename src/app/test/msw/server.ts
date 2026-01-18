import { setupServer } from 'msw/node';
import { handlers } from '@/app/test/msw/handlers';

export const server = setupServer(...handlers);