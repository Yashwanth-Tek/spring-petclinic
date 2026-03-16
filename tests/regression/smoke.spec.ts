import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

test.describe('PetClinic Regression Tests', () => {
  test('should load home page', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await expect(page).toHaveTitle(/PetClinic/);
  });

  test('should navigate to find owners', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.click('text=Find owners');
    await expect(page).toHaveURL(/.*owners/);
  });

  test('should display veterinarians list', async ({ page }) => {
    await page.goto(`${BASE_URL}/vets.html`);
    await expect(page.locator('text=Veterinarians')).toBeVisible();
  });

  test('should display error on invalid owner search', async ({ page }) => {
    await page.goto(`${BASE_URL}/owners`);
    await page.fill('input[name="lastName"]', 'NonExistentOwner123');
    await page.click('button:has-text("Find Owner")');
    await expect(page.locator('text=has not been found')).toBeVisible();
  });
});
