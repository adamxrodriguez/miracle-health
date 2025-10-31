import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";
import { useAdvocates } from "./useAdvocates";

// Mock the API client
vi.mock("../api", () => ({
  apiClient: {
    getAdvocates: vi.fn(),
  },
}));

import { apiClient } from "../api";

describe("useAdvocates", () => {
  const mockAdvocates = [
    {
      firstName: "John",
      lastName: "Doe",
      city: "New York",
      degree: "MD",
      specialties: ["Cardiology"],
      yearsOfExperience: 10,
      phoneNumber: "5551234567",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches advocates successfully", async () => {
    vi.mocked(apiClient.getAdvocates).mockResolvedValue(mockAdvocates);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
    );

    const { result } = renderHook(() => useAdvocates(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.advocates).toEqual(mockAdvocates);
    expect(result.current.error).toBeNull();
  });

  it("handles errors correctly", async () => {
    const errorMessage = "Failed to fetch";
    vi.mocked(apiClient.getAdvocates).mockRejectedValue(new Error(errorMessage));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
    );

    const { result } = renderHook(() => useAdvocates(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.advocates).toEqual([]);
  });
});
