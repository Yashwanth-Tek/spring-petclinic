import { test, expect } from '@playwright/test';

test.describe('Veterinarian Journey', () => {
  test('should view veterinarians list', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=Veterinarians');
    
    await expect(page.locator('h2:has-text("Veterinarians")')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
  });
});
