import { expect, test } from '@playwright/test'

test('sign-in account', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('textbox', { name: 'Email' }).click()
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com')
  await page.getByRole('textbox', { name: 'Пароль' }).click()
  await page.getByRole('textbox', { name: 'Пароль' }).fill('123456')
  await page.getByRole('button', { name: 'Войти' }).click()
  await expect(page.getByTestId('sidebar')).toBeVisible()
  await page.getByRole('button', { name: 'Выйти' }).click()
  await expect(page.getByTestId('sidebar')).not.toBeVisible()
})
