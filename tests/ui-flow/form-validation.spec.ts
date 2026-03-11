import { test, expect } from '@playwright/test';

test.describe('Form Validation Flow', () => {
  test('should validate owner form fields', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Find Owners');
    await page.click('text=Add Owner');
    
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=is required')).toHaveCount(5);
  });
});
