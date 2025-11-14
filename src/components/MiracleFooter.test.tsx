import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MiracleFooter from "./MiracleFooter";

describe("MiracleFooter", () => {
  it("renders with default props", () => {
    render(<MiracleFooter />);

    expect(screen.getByText(/Find an advocate by specialty/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Our Mission/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Contact Us/i })).toBeInTheDocument();
  });

  it("renders custom brand name", () => {
    render(<MiracleFooter brandName="Test Brand" />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear} Test Brand`, "i"))).toBeInTheDocument();
  });

  it("renders specialty links", () => {
    render(<MiracleFooter />);

    expect(screen.getByText(/Elder Care/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancer/i)).toBeInTheDocument();
  });

  it("has proper ARIA label", () => {
    render(<MiracleFooter />);

    const footer = screen.getByLabelText(/MIRACLE HEALTH Site footer/i);
    expect(footer).toBeInTheDocument();
  });
});

