import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

test.describe('PetClinic Regression Tests', () => {
  test('should load home page', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await expect(page).toHaveTitle(/PetClinic/);
  });

  test('should navigate to find owners', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.click('a:has-text("Find owners")');
    await expect(page).toHaveURL(/.*owners/);
  });

  test('should display veterinarians page', async ({ page }) => {
    await page.goto(`${BASE_URL}/vets.html`);
    await expect(page).toHaveURL(/.*vets/);
  });

  test('should load owners page', async ({ page }) => {
    await page.goto(`${BASE_URL}/owners`);
    await expect(page).toHaveURL(/.*owners/);
  });
});
