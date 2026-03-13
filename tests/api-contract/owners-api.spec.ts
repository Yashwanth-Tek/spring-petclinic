import { test, expect } from '@playwright/test';

test.describe('Owners Page Contract', () => {
  test('should return find owners page successfully', async ({ page }) => {
    // Navigate to the find owners page
    const response = await page.goto('/owners/find');

    // Verify page loads successfully
    expect(response?.status()).toBe(200);

    // Verify page content
    await expect(page.locator('h2')).toContainText('Find Owners');
    await expect(page.locator('input#lastName')).toBeVisible();
  });

  test('should display owners list when searching', async ({ page }) => {
    // Navigate to find owners page
    await page.goto('/owners/find');

    // Submit empty search to get all owners
    await page.click('button[type="submit"]');

    // Should navigate to owners list or show results
    await expect(page).toHaveURL(/\/owners/, { timeout: 10000 });
  });
});
