import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Step2 from '@/app/wizard/step-2/page';

import '../../test/setup';

describe('Wizard Step 2 - Travelers min/max', () => {
  it('requires at least 1 traveler (Remove is disabled when one traveler)', async () => {
    render(<Step2 />);
    expect(await screen.findByText(/travelers/i)).toBeInTheDocument();
    // Remove button should not be present when only 1 traveler
    const removeBtns = screen.queryAllByRole('button', { name: /remove/i });
    expect(removeBtns.length).toBe(0);
  });

  it('cannot exceed 5 travelers (Add Traveler button is disabled at 5)', async () => {
    render(<Step2 />);
    // Add 4 more travelers
    const addBtn = await screen.findByRole('button', { name: /add traveler/i });
    for (let i = 0; i < 4; i++) {
      userEvent.click(addBtn);
    }
    // Should now have 5 travelers, Add button should be disabled
    expect(screen.getAllByLabelText(/full name/i).length).toBe(5);
    expect(addBtn).toBeDisabled();
  });
});
