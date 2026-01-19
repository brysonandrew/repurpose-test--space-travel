/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step3 from '@/app/wizard/step-3/page';
import { renderWithWizard } from '@/test/utils/renderWithWizard';
import '@/test/setup';
import { INIT_STATE_STEP_2 } from '@/test/constants';

const INIT_STATE = {
  ...INIT_STATE_STEP_2,
  travelers: [
    {
      fullName: 'Andrew Bryson',
      age: 39,
    },
  ],
};

const debug = (...args: any[]) => {
  console.log('[TEST DEBUG]', ...args);
};

describe('Wizard Step 3 - Submit & Booking Confirmation', () => {
  it('submits booking and displays bookingId on success', async () => {
    const user = userEvent.setup();

    debug('Rendering Step3');
    renderWithWizard(<Step3 />, { initialState: INIT_STATE });

    debug('Waiting for "booking review" header');
    try {
      expect(await screen.findByText(/booking review/i)).toBeInTheDocument();
      debug('"booking review" header appeared');
    } catch (err) {
      debug('find booking review header failed, dumping DOM');
      screen.debug();
      throw err;
    }

    // Grab the submit button ONCE. After submit, the UI can swap to "Booking Confirmed!"
    // and this button may no longer exist.
    const submitBtn = screen.getByRole('button', {
      name: /confirm and book/i,
    }) as HTMLButtonElement;

    debug('Submit button initial disabled?', submitBtn.disabled, 'text:', submitBtn.textContent);

    debug('Clicking submit button');
    try {
      await user.click(submitBtn);
    } catch (err) {
      debug('click submit failed, dumping DOM');
      screen.debug();
      throw err;
    }

    // Optional: if your implementation disables before swapping screens,
    // this can pass; if the button disappears immediately, don’t assert on it.
    // (Keep it resilient by not depending on the button existing.)
    await waitFor(() => {
      // If still present, it should be disabled. If not present, that’s fine too.
      if (document.body.contains(submitBtn)) {
        expect(submitBtn).toBeDisabled();
      }
    });

    debug('Waiting for booking confirmation UI');
    try {
      expect(
        await screen.findByRole('heading', { name: /booking confirmed/i }),
      ).toBeInTheDocument();

      expect(await screen.findByText(/your booking id/i)).toBeInTheDocument();
      // If you want to assert a specific ID, do it here:
      // expect(await screen.findByText(/xyz123/i)).toBeInTheDocument();

      debug('Booking confirmed UI appeared');
    } catch (err) {
      debug('booking confirmation assertions failed, dumping DOM');
      screen.debug();
      throw err;
    }
  });
});
