import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/quizz/demo');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Quizzoto/);
});

test('has texts', async ({ page }) => {
  await page.goto('http://localhost:3000/quizz/demo');

  // Expect the await expect(page.locator('h1')).toContainText('Demo quizz');
  await expect(page.locator('h2')).toContainText('Quizz pour démontrer les titres de champs possibles.');
});
