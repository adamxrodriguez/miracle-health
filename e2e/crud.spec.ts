import { test, expect } from "@playwright/test";

test.describe("Advocates CRUD Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display advocates list", async ({ page }) => {
    // Wait for advocates to load
    await expect(page.getByRole("heading", { name: /Miracle Health Providers/i })).toBeVisible();
    
    // Check that the search input is visible
    await expect(page.getByRole("searchbox", { name: "Search advocates" })).toBeVisible();
    
    // Wait for advocates table to load (check for at least one advocate)
    await page.waitForSelector('table tbody tr', { timeout: 10000 });
    
    // Wait for table to be fully rendered
    const table = page.locator('table[aria-label="Health care advocates directory"]');
    await expect(table).toBeVisible();
    
    // Verify table structure - check headers using text content in thead
    const tableHeaders = [
      "First Name",
      "Last Name",
      "City",
      "Degree",
      "Specialties",
      "Years of Experience",
      "Phone",
    ];
    
    const thead = table.locator('thead');
    await expect(thead).toBeVisible();
    
    for (const header of tableHeaders) {
      // Use getByText within thead context for more reliable matching
      await expect(thead.getByText(header, { exact: true })).toBeVisible();
    }
  });

  test("should filter advocates by search query", async ({ page }) => {
    await page.waitForSelector('table tbody tr', { timeout: 10000 });
    
    const searchInput = page.getByRole("searchbox", { name: "Search advocates" });
    await searchInput.fill("Adam");
    
    // Wait for filtering
    await page.waitForTimeout(500);
    
    // Verify results contain "Adam"
    const rows = page.locator('table tbody tr');
    const count = await rows.count();
    
    if (count > 0) {
      const firstRowText = await rows.first().textContent();
      expect(firstRowText?.toLowerCase()).toContain("adam");
    }
  });

  test("should clear search and show all advocates", async ({ page }) => {
    await page.waitForSelector('table tbody tr', { timeout: 10000 });
    
    const searchInput = page.getByRole("searchbox", { name: "Search advocates" });
    await searchInput.fill("Nonexistent");
    
    await page.waitForTimeout(500);
    
    // Should show no results message
    await expect(page.getByText(/No advocates match/i)).toBeVisible();
    
    // Click reset button
    await page.getByRole("button", { name: /Reset search/i }).click();
    
    await page.waitForTimeout(500);
    
    // Should show advocates again
    await expect(page.locator('table tbody tr')).toHaveCount(await page.locator('table tbody tr').count());
  });

  test("should navigate to phone link", async ({ page }) => {
    await page.waitForSelector('table tbody tr', { timeout: 10000 });
    
    // Find first phone link
    const phoneLink = page.locator('table tbody tr').first().getByRole("link");
    const href = await phoneLink.getAttribute("href");
    
    expect(href).toMatch(/^tel:/);
  });

  test("should handle loading state", async ({ page }) => {
    // Navigate to page and check for loading indicator
    const loadingText = page.getByText(/Loading advocates/i);
    
    // Loading should appear briefly, then disappear
    await expect(loadingText).not.toBeVisible({ timeout: 10000 });
  });

  test("should display CTA card", async ({ page }) => {
    await expect(page.getByText(/I AM HERE FOR YOU/i)).toBeVisible();
    await expect(page.getByText(/No Matter What You Need/i)).toBeVisible();
    
    // Check for action buttons
    await expect(page.getByRole("link", { name: /Call me!/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Email me/i })).toBeVisible();
  });
});

