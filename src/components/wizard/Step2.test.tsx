/* eslint-disable @typescript-eslint/no-explicit-any */
const debug = (...args: any[]) => {
  console.log('[TEST DEBUG]', ...args);
};
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step2 from '@/app/wizard/step-2/page';

import '@/test/setup';
import { renderWithWizard } from '@/test/utils/renderWithWizard';

const INIT_STATE = {};

describe('Wizard Step 2 - Travelers min/max', () => {
  it('requires at least 1 traveler (Remove is disabled when one traveler)', async () => {
    debug('Rendering Step2');
    renderWithWizard(<Step2 />);
    debug('Waiting for Step2 heading');
    let travelersHeading;
    try {
      travelersHeading = await screen.findByRole('heading', { name: /^travelers$/i });
      debug('"Travelers" heading appeared');
    } catch (err) {
      debug('waitFor travelers heading failed, dumping DOM');
      screen.debug();
      throw err;
    }
    expect(travelersHeading).toBeInTheDocument();
    debug('Checking for Remove buttons');
    const removeBtns = screen.queryAllByRole('button', { name: /remove/i });
    expect(removeBtns.length).toBe(0);
    debug('Remove buttons present:', removeBtns.length);
  });

  it('cannot exceed 5 travelers (Add Traveler button is disabled at 5)', async () => {
    debug('Rendering Step2');
    renderWithWizard(<Step2 />);
    // Add 4 more travelers
    const user = userEvent.setup();

    const addBtn: HTMLButtonElement = screen.getByRole('button', { name: /^\+ add traveler$/i });
    debug(
      '"Add Traveler" button initial disabled?',
      addBtn.hasAttribute('disabled') || addBtn.disabled,
    );

    for (let i = 1; i <= 4; i++) {
      debug(`Before click ${i} on Add Traveler`);
      await user.click(addBtn);
      debug(
        `After click ${i} on Add Traveler. Button disabled?`,
        addBtn.hasAttribute('disabled') || addBtn.disabled,
      );
    }

    debug('Asserting number of traveler inputs');

    const nameInputs = screen.getAllByLabelText(/full name/i);
    expect(nameInputs).toHaveLength(5);

    debug(
      '"Add Traveler" button disabled after adding 5?',
      addBtn.hasAttribute('disabled') || addBtn.disabled,
    );
    expect(addBtn).toBeDisabled();
  });
});
