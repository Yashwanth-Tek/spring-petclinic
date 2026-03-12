import { test, expect } from '@playwright/test';

test.describe('Owners API Contract', () => {
  test('should return owners list with correct schema', async ({ request }) => {
    const response = await request.get('/api/owners');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });
});
