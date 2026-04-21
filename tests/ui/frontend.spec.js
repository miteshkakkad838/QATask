import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

import { LoginPage } from '../../pages/loginpage.js';

test('Login Test - SauceDemo', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login();
    expect(await expect(page.locator('[data-test="inventory-list"]')).toBeVisible()); //assert
});