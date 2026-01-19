import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step2 from '@/app/wizard/step-2/page';

import '../../test/setup';

describe('Wizard Step 2 - Travelers min/max', () => {
  it('requires at least 1 traveler (Remove is disabled when one traveler)', async () => {
    render(<Step2 />);
    expect(await screen.findByRole('heading', { name: /^travelers$/i })).toBeInTheDocument(); // Remove button should not be present when only 1 traveler
    const removeBtns = screen.queryAllByRole('button', { name: /remove/i });
    expect(removeBtns.length).toBe(0);
  });

  it('cannot exceed 5 travelers (Add Traveler button is disabled at 5)', async () => {
    render(<Step2 />);
    // Add 4 more travelers
    const user = userEvent.setup();

    const addBtn = screen.getByRole('button', { name: /^\+ add traveler$/i });
    await user.click(addBtn);
    await user.click(addBtn);
    await user.click(addBtn);
    await user.click(addBtn);

    expect(screen.getAllByTestId(/traveler-fullname-/)).toHaveLength(5);
    expect(addBtn).toBeDisabled();
  });
});
