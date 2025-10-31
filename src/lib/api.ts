import { z } from "zod";

// Zod schemas for type-safe API responses
const AdvocateSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  degree: z.string(),
  specialties: z.array(z.string()),
  yearsOfExperience: z.union([z.string(), z.number()]),
  phoneNumber: z.string(),
});

const AdvocatesResponseSchema = z.object({
  data: z.array(AdvocateSchema),
});

export type Advocate = z.infer<typeof AdvocateSchema>;
export type AdvocatesResponse = z.infer<typeof AdvocatesResponseSchema>;

/**
 * Typed API client for fetching advocates
 * Validates responses with Zod at the boundary
 */
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetch all advocates with validation
   */
  async getAdvocates(): Promise<Advocate[]> {
    const startMark = `api-getAdvocates-${Date.now()}`;
    performance.mark(startMark);

    try {
      const response = await fetch(`${this.baseUrl}/api/advocates`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch advocates: ${response.statusText}`);
      }

      const json = await response.json();
      
      // Validate response at boundary
      const validated = AdvocatesResponseSchema.parse(json);
      
      performance.mark(`${startMark}-end`);
      performance.measure(`api-getAdvocates`, startMark, `${startMark}-end`);

      return validated.data;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("API response validation failed:", error.issues);
        throw new Error("Invalid API response format");
      }
      throw error;
    }
  }

  /**
   * Seed the database (for development/testing)
   */
  async seedDatabase(): Promise<void> {
    const startMark = `api-seed-${Date.now()}`;
    performance.mark(startMark);

    try {
      const response = await fetch(`${this.baseUrl}/api/seed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to seed database: ${response.statusText}`);
      }

      performance.mark(`${startMark}-end`);
      performance.measure(`api-seed`, startMark, `${startMark}-end`);
    } catch (error) {
      console.error("Seed failed:", error);
      throw error;
    }
  }
}

// Default client instance
export const apiClient = new ApiClient();

