import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Step3 from '@/app/wizard/step-3/page';

// MSW setup (handlers provided elsewhere in src/test/msw)
import '../../test/setup';

describe('Wizard Step 3 - Submit & Booking Confirmation', () => {
  it('disables submit on click, shows loading, and displays bookingId on success', async () => {
    render(<Step3 />);
    // Wait for review to show (destinations fetched)
    expect(await screen.findByText(/booking review/i)).toBeInTheDocument();
    const submitBtn = screen.getByRole('button', { name: /confirm and book|booking\.{3}/i });

    // Fill in minimal valid data by simulating state (assuming mocks/handlers set up state valid enough for submit)
    // Click submit
    userEvent.click(submitBtn);

    // Should become disabled and show loading
    await waitFor(() => expect(submitBtn).toBeDisabled());
    const loadingText = await screen.findByText(/booking\.\.\./i);
    expect(loadingText).toBeInTheDocument();

    // Wait for booking confirmed message with bookingId
    expect(await screen.findByText(/booking confirmed/i)).toBeInTheDocument();
    expect(await screen.findByText(/your booking id/i)).toBeInTheDocument();
  });
});
