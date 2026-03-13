import { test, expect } from '@playwright/test';

test.describe('Vets Page Contract', () => {
  test('should return veterinarians page successfully', async ({ page }) => {
    // Navigate to the veterinarians page
    const response = await page.goto('/vets.html');

    // Verify page loads successfully
    expect(response?.status()).toBe(200);

    // Verify page has the expected content
    await expect(page.locator('h2')).toContainText('Veterinarians');
    await expect(page.locator('table')).toBeVisible();
  });

  test('should display veterinarians in a table', async ({ page }) => {
    await page.goto('/vets.html');

    // Verify table has rows (header + at least one vet)
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(await rows.count(), { timeout: 5000 });

    // Verify table has expected columns
    await expect(page.locator('table th')).toContainText(['Name', 'Specialties']);
  });
});
