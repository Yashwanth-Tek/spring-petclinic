import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

test.describe('Authentication and Authorization Tests', () => {
  test('should access public pages without authentication', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await expect(page).toHaveTitle(/PetClinic/);
  });

  test('should display vets page publicly', async ({ page }) => {
    await page.goto(`${BASE_URL}/vets.html`);
    await expect(page).toHaveURL(/.*vets/);
  });

  test('should allow owner search without authentication', async ({ page }) => {
    await page.goto(`${BASE_URL}/owners`);
    await expect(page).toHaveURL(/.*owners/);
  });

  test('should navigate to owners list', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.click('a:has-text("Find owners")');
    await expect(page).toHaveURL(/.*owners/);
  });

  test('should load home page successfully', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const title = await page.title();
    expect(title).toContain('PetClinic');
  });
});
