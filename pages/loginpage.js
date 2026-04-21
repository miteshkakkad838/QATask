export class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = '#user-name';
        this.password = '#password';
        this.loginBtn = '#login-button';
        this.inventoryList = '[data-test="inventory-list"]';
    }

    async goto() {
        await this.page.goto('/');
    }

    async login() {
        await this.page.fill(this.username, process.env.STORE_USER);
        await this.page.fill(this.password, process.env.STORE_PASSWORD);
        await this.page.click(this.loginBtn);
    }
}