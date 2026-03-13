import { test, expect } from '@playwright/test';

test.describe('Form Validation Flow', () => {
  test('should validate owner form fields', async ({ page }) => {
    // Navigate directly to the new owner form
    await page.goto('/owners/new');

    // Submit empty form to trigger validation
    await page.click('button[type="submit"]');

    // The Spring PetClinic MVC app shows "must not be blank" for validation errors
    await expect(page.locator('text=must not be blank')).toHaveCount(5, { timeout: 10000 });
  });
});
