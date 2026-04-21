import { expect } from '@playwright/test';

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.sortDropdown = '[data-test="product-sort-container"]';
        this.prices = '[data-test="inventory-item-price"]';
        this.addBtns = '.inventory_item button';
        this.cartIcon = '[data-test="shopping-cart-link"]';
        this.itemNames = '[data-test="inventory-item-name"]';
    }

    async sortHighToLow() {
        await this.page.selectOption(this.sortDropdown, 'hilo');
    }

    // remove $ and get prices in number array
    async getPrices() {
        const prices = await this.page.locator(this.prices).allTextContents();
        return prices.map(p => Number(p.replace('$', '')));
    }

    // verify sorting by price desc
    async verifySorting() {
        const prices = await this.getPrices();
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sorted);
    }

    // get top two item names   
    async getTopTwoItems() {
        const names = await this.page.locator(this.itemNames).allTextContents();
        return names.slice(0, 2);
    }

    // add top two items to cart
    async addTopTwoItems() {
        await this.page.locator(this.addBtns).nth(0).click();
        await this.page.locator(this.addBtns).nth(1).click();
    }

    async goToCart() {
        await this.page.click(this.cartIcon);
    }
}