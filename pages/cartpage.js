import { expect } from '@playwright/test';

export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = '.inventory_item_name';
        this.checkoutBtn = '#checkout';
    }

    async verifyItems(expectedItems) {
        const items = await this.page.locator(this.cartItems).allTextContents();
        expect(items).toEqual(expectedItems);
    }

    async checkout() {
        await this.page.click(this.checkoutBtn);
    }
}