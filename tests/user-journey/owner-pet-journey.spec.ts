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

  test('should search for existing owner and view details', async ({ page }) => {
    // Navigate to Find Owners
    await page.goto('/owners/find');

    // Search with empty field to get all owners
    await page.click('button[type="submit"]');

    // Should see a list of owners or be redirected to owner details
    await expect(page).toHaveURL(/\/owners/);

    // Click on the first owner in the list (if list view)
    const ownerLink = page.locator('table a').first();
    if (await ownerLink.isVisible()) {
      await ownerLink.click();

      // Verify owner details page
      await expect(page.locator('h2:has-text("Owner Information")')).toBeVisible();
    }
  });

  test('should add a visit for a pet', async ({ page }) => {
    // First, create an owner with a pet
    await page.goto('/owners/new');

    const uniqueId = Date.now();
    await page.fill('#firstName', 'Visit');
    await page.fill('#lastName', `Test${uniqueId}`);
    await page.fill('#address', '456 Test Ave');
    await page.fill('#city', 'TestCity');
    await page.fill('#telephone', '9876543210');
    await page.click('button[type="submit"]');

    // Add a pet
    await page.click('text=Add New Pet');
    await page.fill('#name', 'TestPet');
    await page.fill('#birthDate', '2021-06-15');
    await page.selectOption('#type', 'cat');
    await page.click('button[type="submit"]');

    // Now add a visit
    await page.click('text=Add Visit');

    // Fill visit form
    await page.fill('#date', '2024-03-15');
    await page.fill('#description', 'Annual checkup and vaccination');
    await page.click('button[type="submit"]');

    // Verify visit was added
    await expect(page.locator('text=Annual checkup and vaccination')).toBeVisible();
  });

  test('should edit owner information', async ({ page }) => {
    // Create an owner first
    await page.goto('/owners/new');

    const uniqueId = Date.now();
    await page.fill('#firstName', 'Edit');
    await page.fill('#lastName', `Test${uniqueId}`);
    await page.fill('#address', '789 Original St');
    await page.fill('#city', 'OriginalCity');
    await page.fill('#telephone', '5555555555');
    await page.click('button[type="submit"]');

    // Click Edit Owner
    await page.click('text=Edit Owner');

    // Update the address and city
    await page.fill('#address', '999 Updated Blvd');
    await page.fill('#city', 'UpdatedCity');
    await page.click('button[type="submit"]');

    // Verify the updates are visible
    await expect(page.locator('text=999 Updated Blvd')).toBeVisible();
    await expect(page.locator('text=UpdatedCity')).toBeVisible();
  });
});
