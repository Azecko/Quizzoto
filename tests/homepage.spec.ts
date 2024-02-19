import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Quizzoto/);
});

test('has texts', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect the page's title (h1)
  await expect(page.getByRole('heading')).toContainText('Quizzoto - Quizz super basique');
});

test('has quizz button', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect the Quizz link-button
  await expect(page.getByRole('link', { name: 'Quizz' })).toBeVisible();
});
