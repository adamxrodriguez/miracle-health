import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SolaceCtaCard from "./SolaceCtaCard";

describe("SolaceCtaCard", () => {
  it("renders with default props", () => {
    render(<SolaceCtaCard />);
    
    expect(screen.getByText(/WE'RE HERE FOR YOU/i)).toBeInTheDocument();
    expect(screen.getByText(/No Matter What You Need/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
    expect(screen.getByText(/Learn More/i)).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    render(
      <MiracleCtaCard
        eyebrow="CUSTOM EYEBROW"
        title="Custom Title"
        subtitle="Custom subtitle text"
        primaryText="Primary Action"
        secondaryText="Secondary Action"
      />
    );

    expect(screen.getByText("CUSTOM EYEBROW")).toBeInTheDocument();
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom subtitle text")).toBeInTheDocument();
    expect(screen.getByText("Primary Action")).toBeInTheDocument();
    expect(screen.getByText("Secondary Action")).toBeInTheDocument();
  });

  it("renders links when hrefs are provided", () => {
    render(
      <MiracleCtaCard
        primaryHref="/primary"
        secondaryHref="/secondary"
      />
    );

    const primaryLink = screen.getByText(/Get Started/i).closest("a");
    const secondaryLink = screen.getByText(/Learn More/i).closest("a");

    expect(primaryLink).toHaveAttribute("href", "/primary");
    expect(secondaryLink).toHaveAttribute("href", "/secondary");
  });

  it("calls onClick handlers when provided", async () => {
    const user = userEvent.setup();
    const onPrimaryClick = vi.fn();
    const onSecondaryClick = vi.fn();

    render(
      <MiracleCtaCard
        onPrimaryClick={onPrimaryClick}
        onSecondaryClick={onSecondaryClick}
      />
    );

    await user.click(screen.getByText(/Get Started/i));
    await user.click(screen.getByText(/Learn More/i));

    expect(onPrimaryClick).toHaveBeenCalledTimes(1);
    expect(onSecondaryClick).toHaveBeenCalledTimes(1);
  });

  it("has proper ARIA labels", () => {
    render(
      <MiracleCtaCard
        primaryText="Call Now"
        secondaryText="Email Us"
      />
    );

    expect(screen.getByLabelText("Support call to action")).toBeInTheDocument();
    expect(screen.getByLabelText("Call Now")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Us")).toBeInTheDocument();
  });
});

