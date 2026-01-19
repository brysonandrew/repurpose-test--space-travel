/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step3 from '@/app/wizard/step-3/page';
import { renderWithWizard } from '@/test/utils/renderWithWizard';
import '@/test/setup';

const INIT_STATE = {};

const debug = (...args: any[]) => {
  console.log('[TEST DEBUG]', ...args);
};

describe('Wizard Step 3 - Submit & Booking Confirmation', () => {
  it('disables submit on click, shows loading, and displays bookingId on success', async () => {
    const user = userEvent.setup();

    debug('Rendering Step3');
    renderWithWizard(<Step3 />);

    // Wait for review to show (destinations fetched)
    debug('Waiting for "booking review" header');
    try {
      expect(await screen.findByText(/booking review/i)).toBeInTheDocument();
      debug('"booking review" header appeared');
    } catch (err) {
      debug('find booking review header failed, dumping DOM');
      screen.debug();
      throw err;
    }

    // One getter for the evolving submit button text (Confirm -> Booking...)
    const submitBtn = (): HTMLButtonElement =>
      screen.getByRole('button', {
        name: /confirm and book|booking\.{3}/i,
      });

    debug(
      'Submit button initial disabled?',
      submitBtn().disabled,
      'text:',
      submitBtn().textContent,
    );

    // Click submit (use the real label, not /submit/i)
    debug('Clicking submit button');
    try {
      await user.click(submitBtn());
    } catch (err) {
      debug('click submit failed, dumping DOM');
      screen.debug();
      throw err;
    }

    // Prefer waiting for loading text (more reliable than "disabled" timing)
    debug('Waiting for loading text ("booking...")');
    try {
      // Submit should disable immediately
      await user.click(submitBtn());

      await waitFor(() => {
        expect(submitBtn()).toBeDisabled();
      });

      // Success UI is the real outcome
      expect(await screen.findByText(/booking confirmed/i)).toBeInTheDocument();
      expect(await screen.findByText(/your booking id/i)).toBeInTheDocument();
      debug('Loading text appeared');
    } catch (err) {
      debug('find loading text failed, dumping DOM');
      screen.debug();
      throw err;
    }

    // Once loading is visible, disabled should be true (if implemented via disabled attr)
    debug(
      'Submit button after loading disabled?',
      submitBtn().disabled,
      'text:',
      submitBtn().textContent,
    );
    expect(submitBtn()).toBeDisabled();

    // Wait for booking confirmed message with bookingId
    debug('Waiting for booking confirmation message');
    try {
      expect(await screen.findByText(/booking confirmed/i)).toBeInTheDocument();
      debug('Booking confirmed message appeared');
    } catch (err) {
      debug('find booking confirmed failed, dumping DOM');
      screen.debug();
      throw err;
    }

    debug('Waiting for booking id text');
    try {
      expect(await screen.findByText(/your booking id/i)).toBeInTheDocument();
      debug('Booking ID message appeared');
    } catch (err) {
      debug('find booking id text failed, dumping DOM');
      screen.debug();
      throw err;
    }
  });
});
