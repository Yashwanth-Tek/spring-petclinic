import { test, expect } from '@playwright/test';

test.describe('Vets API Contract', () => {
  test('should return vets list with correct schema', async ({ request, baseURL }) => {
    const url = `${baseURL}/api/vets`;
    const response = await request.get(url);
    
    if (response.status() !== 200) {
      console.log(`Failed to fetch ${url}: ${response.status()}`);
      console.log(await response.text());
    }
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('vetList');
    expect(Array.isArray(body.vetList)).toBeTruthy();
  });
});
