import { test, expect } from '@playwright/test';

test.describe('Owners API Contract', () => {
  test('should return owners list with correct schema', async ({ request, baseURL }) => {
    const url = `${baseURL}/api/owners`;
    const response = await request.get(url);
    
    if (response.status() !== 200) {
      console.log(`Failed to fetch ${url}: ${response.status()}`);
      console.log(await response.text());
    }
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });
});
