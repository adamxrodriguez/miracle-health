import { describe, it, expect, vi, beforeEach } from "vitest";
import { ApiClient } from "./api";

describe("ApiClient", () => {
  let client: ApiClient;
  const mockFetch = vi.fn();

  beforeEach(() => {
    client = new ApiClient();
    global.fetch = mockFetch;
    vi.clearAllMocks();
  });

  it("fetches and validates advocates successfully", async () => {
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

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockAdvocates }),
    });

    const result = await client.getAdvocates();

    expect(result).toEqual(mockAdvocates);
    expect(mockFetch).toHaveBeenCalledWith("/api/advocates", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  });

  it("throws error on invalid response format", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ invalid: "format" }),
    });

    await expect(client.getAdvocates()).rejects.toThrow("Invalid API response format");
  });

  it("throws error on network failure", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    await expect(client.getAdvocates()).rejects.toThrow("Network error");
  });

  it("throws error on non-ok response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    });

    await expect(client.getAdvocates()).rejects.toThrow("Failed to fetch advocates");
  });

  it("seeds database successfully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await client.seedDatabase();

    expect(mockFetch).toHaveBeenCalledWith("/api/seed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  });
});

