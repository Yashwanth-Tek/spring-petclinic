import { test, expect } from '@playwright/test';

test.describe('Vets API Contract', () => {
  test('should return vets list with correct schema', async ({ request }) => {
    const response = await request.get('/api/vets');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('vetList');
    expect(Array.isArray(data.vetList)).toBeTruthy();
    
    if (data.vetList.length > 0) {
      expect(data.vetList[0]).toHaveProperty('id');
      expect(data.vetList[0]).toHaveProperty('firstName');
      expect(data.vetList[0]).toHaveProperty('lastName');
    }
  });
});
