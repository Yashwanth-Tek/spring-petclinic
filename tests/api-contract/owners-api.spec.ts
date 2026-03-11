import { test, expect } from '@playwright/test';

test.describe('Owners API Contract', () => {
  test('should return owners list with correct schema', async ({ request }) => {
    const response = await request.get('/api/owners');
    
    expect(response.status()).toBe(200);
    
    const owners = await response.json();
    expect(Array.isArray(owners)).toBeTruthy();
    
    if (owners.length > 0) {
      expect(owners[0]).toHaveProperty('id');
      expect(owners[0]).toHaveProperty('firstName');
      expect(owners[0]).toHaveProperty('lastName');
    }
  });
});
