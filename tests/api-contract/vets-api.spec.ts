import { test, expect } from '@playwright/test';

test.describe('Vets API Contract', () => {
  test('should return vets list with correct schema', async ({ request }) => {
    const response = await request.get('/api/vets');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('vetList');
    expect(Array.isArray(body.vetList)).toBeTruthy();
  });
});
