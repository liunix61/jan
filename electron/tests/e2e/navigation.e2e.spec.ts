import { expect } from '@playwright/test'
import {
  page,
  setupElectron,
  TIMEOUT,
  test,
  teardownElectron,
} from '../pages/basePage'

test.beforeAll(async () => {
  await setupElectron()
})

test.afterAll(async () => {
  await teardownElectron()
})

test('renders left navigation panel', async () => {
  const systemMonitorBtn = await page
    .getByTestId('System Monitor')
    .first()
    .isEnabled({
      timeout: TIMEOUT,
    })
  const settingsBtn = await page
    .getByTestId('Thread')
    .first()
    .isEnabled({ timeout: TIMEOUT })
  expect([systemMonitorBtn, settingsBtn].filter((e) => !e).length).toBe(0)
  // Chat section should be there
  await page.getByTestId('Local API Server').first().click({
    timeout: TIMEOUT,
  })
  const localServer = page.getByTestId('local-server-testid').first()
  await expect(localServer).toBeVisible({
    timeout: TIMEOUT,
  })
})