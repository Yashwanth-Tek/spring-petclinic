import { test, expect } from '@playwright/test';

test.describe('Navigation Flow', () => {
  test('should navigate through main menu items', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=Welcome')).toBeVisible();
    
    await page.click('text=Find Owners');
    await expect(page).toHaveURL(/.*owners/);
    
    await page.click('text=Veterinarians');
    await expect(page).toHaveURL(/.*vets/);
    
    await page.click('a.navbar-brand');
    await expect(page).toHaveURL('/');
  });
});
