import dotenv from 'dotenv';
dotenv.config();
export class ApiHelper {
    constructor(request) {
        this.request = request;
        this.baseURL = process.env.BASE_URL;
    }

    // Login API
    async login() {
        const res = await this.request.post(`${this.baseURL}/auth/login`, {
            data: {
                username: process.env.APP_USERNAME,
                password: process.env.APP_PASSWORD
            }
        });
        console.log("ENV USERNAME:", process.env.APP_PASSWORD);
        console.log("USERNAME:", process.env.APP_USERNAME);
        console.log("PASSWORD:", process.env.APP_PASSWORD);
        const body = await res.json();

        return {
            status: res.status(),
            token: body.accessToken,
            userId: body.id,
            fullResponse: body
        };
    }

    // Get Cart Api
    async getCart(userId, token) {
        const res = await this.request.get(
            `${this.baseURL}/carts/user/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return {
            status: res.status(),
            body: await res.json()
        };
    }

    // Add Product
    async addProduct(userId, token, productId, quantity) {
        const res = await this.request.post(`${this.baseURL}/carts/add`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                userId,
                products: [{ id: productId, quantity }]
            }
        });

        return {
            status: res.status(),
            body: await res.json()
        };
    }
}