/* eslint-disable @typescript-eslint/no-explicit-any */
const debug = (...args: any[]) => {
  console.log("[TEST DEBUG]", ...args);
};
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step1 from "@/app/wizard/step-1/page";
import "@/test/setup";
import { renderWithWizard } from "@/test/utils/renderWithWizard";

describe("Wizard Step 1 - Date Validation", () => {
  it("blocks Next if return date is before departure date", async () => {
    debug("Rendering Step1");
    renderWithWizard(<Step1 />);

    // Wait for the destinations to load (simulate API success)
    debug('Waiting for: "choose your destination" to appear');
    let destinationText;
    try {
      destinationText = await screen.findByText(/choose your destination/i);
      debug('"choose your destination" appeared');
    } catch (err) {
      debug('waitFor "choose your destination" failed, dumping DOM');
      screen.debug();
      throw err;
    }
    expect(destinationText).toBeInTheDocument();

    // Select any destination option (depends on mock destinations, use label or fallback)
    debug("Waiting for radio buttons");
    const destinationRadio = await screen.findAllByRole("radio");
    if (destinationRadio.length > 0) {
      debug(
        "Before click: Selecting first radio",
        destinationRadio[0].getAttribute("aria-label") || destinationRadio[0].id
      );
      await userEvent.click(destinationRadio[0]);
      debug("After click: Selected first radio");
    } else {
      debug("No radio buttons found!");
    }

    // Enter departure and return dates (simulate filling out)
    const departureInput = screen.getByLabelText(/departure date/i);
    const returnInput = screen.getByLabelText(/return date/i);
    debug(
      "Before typing: departureInput value:",
      (departureInput as HTMLInputElement).value
    );
    await userEvent.clear(departureInput);
    await userEvent.type(departureInput, "2030-01-10");
    debug(
      "After typing: departureInput value:",
      (departureInput as HTMLInputElement).value
    );
    debug(
      "Before typing: returnInput value:",
      (returnInput as HTMLInputElement).value
    );
    await userEvent.clear(returnInput);
    await userEvent.type(returnInput, "2030-01-05"); // Return before departure
    debug(
      "After typing: returnInput value:",
      (returnInput as HTMLInputElement).value
    );

    // Try to proceed to next step
    const nextBtn = screen.getByTestId("wizard-next");
    debug("Next button disabled?", nextBtn.hasAttribute("disabled"));
    debug("Before click Next button");
    await userEvent.click(nextBtn);
    debug("After click Next button");
    debug(
      "Next button disabled after click?",
      nextBtn.hasAttribute("disabled")
    );

    // Assert visible error or that navigation did not trigger (no routing change)
    debug("Waiting for return date validation error");
    try {
      expect(
        screen.getAllByText(/return date must be after/i)[0]
      ).toBeInTheDocument();
      debug("Validation error appeared");
    } catch (err) {
      debug("waitFor validation error failed, dumping DOM");
      screen.debug();
      throw err;
    }
  });
});
