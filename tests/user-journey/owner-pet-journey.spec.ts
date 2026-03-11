import { test, expect } from '@playwright/test';

test.describe('Owner and Pet Management Journey', () => {
  test('should complete full owner and pet registration flow', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=Find Owners');
    await page.click('text=Add Owner');
    
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#address', '123 Main St');
    await page.fill('#city', 'Springfield');
    await page.fill('#telephone', '1234567890');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=John Doe')).toBeVisible();
    
    await page.click('text=Add New Pet');
    await page.fill('#name', 'Buddy');
    await page.fill('#birthDate', '2020-01-01');
    await page.selectOption('#type', 'dog');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Buddy')).toBeVisible();
  });
});
