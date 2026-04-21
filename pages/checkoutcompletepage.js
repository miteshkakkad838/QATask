import { expect } from '@playwright/test';

export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.successMsg = '.complete-header';
    }

    async verifyOrder() {
        await expect(this.page.locator(this.successMsg))
            .toHaveText('Thank you for your order!');
    }
}