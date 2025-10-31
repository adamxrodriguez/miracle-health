import useSWR from "swr";
import { apiClient, type Advocate } from "../api";

/**
 * SWR hook for fetching advocates with caching and revalidation
 */
export function useAdvocates() {
  const { data, error, isLoading, mutate } = useSWR<Advocate[]>(
    "/api/advocates",
    () => apiClient.getAdvocates(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5000, // Cache for 5 seconds
    }
  );

  return {
    advocates: data ?? [],
    isLoading,
    error: error ? (error instanceof Error ? error.message : "Failed to load advocates") : null,
    mutate, // For cache invalidation
  };
}

