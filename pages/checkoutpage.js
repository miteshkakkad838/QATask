export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstName = '#first-name';
        this.lastName = '#last-name';
        this.postalCode = '#postal-code';
        this.continueBtn = '#continue';
        this.finishBtn = '#finish';
    }

    async fillDetails() {
        await this.page.fill(this.firstName, 'Mitesh');
        await this.page.fill(this.lastName, 'Kakkad');
        await this.page.fill(this.postalCode, '360001');
        await this.page.click(this.continueBtn);
    }

    async finishOrder() {
        await this.page.click(this.finishBtn);
    }
}