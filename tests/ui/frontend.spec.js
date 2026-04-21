import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

import { LoginPage } from '../../pages/loginpage.js';
import { InventoryPage } from '../../pages/inventorypage.js';
import { CartPage } from '../../pages/cartpage.js';
import { CheckoutPage } from '../../pages/checkoutpage.js';
import { CheckoutCompletePage } from '../../pages/checkoutcompletepage.js';


test('Full flow test', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const completePage = new CheckoutCompletePage(page);

    await test.step("Login", async () => {
        await loginPage.goto();
        await page.waitForLoadState('networkidle');
        await loginPage.login();
        await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
    });

    await test.step("Sort Products High to Low", async () => {
        await inventoryPage.sortHighToLow();
    });

    await test.step("Verify Sorting", async () => {
        await inventoryPage.verifySorting();
    });

    let topItems;

    await test.step("Get Top 2 Products", async () => {
        topItems = await inventoryPage.getTopTwoItems();
    });

    await test.step("Add Top 2 Products to Cart", async () => {
        await inventoryPage.addTopTwoItems();
    });

    await test.step("Go to Cart", async () => {
        await inventoryPage.goToCart();
    });

    await test.step("Verify Cart Items", async () => {
        await cartPage.verifyItems(topItems);
    });

    await test.step("Checkout", async () => {
        await cartPage.checkout();
    });

    await test.step("Fill Checkout Details", async () => {
        await checkoutPage.fillDetails();
    });

    await test.step("Finish Order", async () => {
        await checkoutPage.finishOrder();
    });

    await test.step("Verify Order Success", async () => {
        await completePage.verifyOrder();
    });
});