import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step1 from '@/app/wizard/step-1/page';

// MSW setup (handlers provided elsewhere in src/test/msw)
import '../../test/setup';

describe('Wizard Step 1 - Date Validation', () => {
  it('blocks Next if return date is before departure date', async () => {
    render(<Step1 />);

    // Wait for the destinations to load (simulate API success)
    expect(await screen.findByText(/choose your destination/i)).toBeInTheDocument();
    // Select any destination option (depends on mock destinations, use label or fallback)
    const destinationRadio = await screen.findAllByRole('radio');
    if (destinationRadio.length > 0) {
      userEvent.click(destinationRadio[0]);
    }

    // Enter departure and return dates (simulate filling out)
    const departureInput = screen.getByLabelText(/departure date/i);
    const returnInput = screen.getByLabelText(/return date/i);

    userEvent.clear(departureInput);
    userEvent.type(departureInput, '2030-01-10');
    userEvent.clear(returnInput);
    userEvent.type(returnInput, '2030-01-05'); // Return before departure

    // Try to proceed to next step
    const nextBtn = screen.getByRole('button', { name: /next/i });
    userEvent.click(nextBtn);

    // Assert visible error or that navigation did not trigger (no routing change)
    expect(screen.getByText(/return date must be after departure/i)).toBeInTheDocument();
  });
});
