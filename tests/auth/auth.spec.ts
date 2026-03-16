import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

test.describe('Authentication and Authorization Tests', () => {
  test('should access public pages without authentication', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await expect(page).toHaveTitle(/PetClinic/);
  });

  test('should display vets page publicly', async ({ page }) => {
    await page.goto(`${BASE_URL}/vets.html`);
    await expect(page.locator('text=Veterinarians')).toBeVisible();
  });

  test('should allow owner search without authentication', async ({ page }) => {
    await page.goto(`${BASE_URL}/owners`);
    await expect(page.locator('text=Find Owner')).toBeVisible();
  });

  test('should handle form submission with valid data', async ({ page }) => {
    await page.goto(`${BASE_URL}/owners`);
    await page.fill('input[name="lastName"]', 'Franklin');
    await page.click('button:has-text("Find Owner")');
    await expect(page).toHaveURL(/.*owners/);
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto(`${BASE_URL}/owners/new`);
    await page.click('button:has-text("Add Owner")');
    const errorMessages = await page.locator('.error').count();
    expect(errorMessages).toBeGreaterThan(0);
  });
});
