import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

test('API Flow Test', async ({ request }) => {

  // Authenticate
  const loginRes = await request.post('https://dummyjson.com/auth/login', {
    data: {
      username: 'emilys',
      password: 'emilyspass'
    }
  });

  expect(loginRes.status()).toBe(200);

  const loginBody = await loginRes.json();
  const token = loginBody.token;
  const userId = loginBody.id;

  // Fetch Cart
  const cartRes = await request.get(`https://dummyjson.com/carts/user/${userId}`);
  expect(cartRes.status()).toBe(200);

  // Add the product
  const addRes = await request.post('https://dummyjson.com/carts/add', {
    data: {
      userId: userId,
      products: [
        { id: 1, quantity: 2 }
      ]
    }
  });

  expect([200, 201]).toContain(addRes.status());

  const addBody = await addRes.json();

  expect(addBody.products[0].id).toBe(1); //Assertions
  expect(addBody.products[0].quantity).toBe(2); 

  expect(addBody.total).toBeGreaterThan(0); //Validate the price

  const schema = {
    type: "object",
    properties: {
      id: { type: "number" },
      products: { type: "array" },
      total: { type: "number" }
    },
    required: ["id", "products", "total"]
  };

  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  expect(validate(addBody)).toBe(true);
});