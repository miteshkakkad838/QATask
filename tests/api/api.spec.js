import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../utils/apihelper.js';
import { validateSchema } from '../../utils/schemavalidator.js';

test('API Flow Test', async ({ request }) => {

  const api = new ApiHelper(request);

  // Login with api
  const login = await api.login();

  expect(login.status).toBe(200);
  expect(login.token).toBeTruthy();

  const token = login.token;
  const userId = login.userId;

  console.log("Token:", token);
  console.log("User ID:", userId);
  console.log("Auth check done");
  console.log("************************");

  // Fetch Cart
  console.log("Fetching Cart...");

  const cart = await api.getCart(userId, token);

  expect(cart.status).toBe(200);
  expect(cart.body).toHaveProperty('carts');
  expect(cart.body.carts.length).toBeGreaterThan(0);

  const products = cart.body.carts[0].products;

  expect(products.length).toBeGreaterThan(0);
  expect(products[0].title).toBeTruthy();

  console.log("Total carts:", cart.body.carts.length);
  console.log("First product:", products[0].title);
  console.log("************************");

  // Add Product
  console.log("Adding Product...");

  const add = await api.addProduct(userId, token, 1, 2);

  expect([200, 201]).toContain(add.status);
  console.log("Status:", add.status);

  const addBody = add.body;

  expect(addBody.products.length).toBeGreaterThan(0);

  const product = addBody.products[0];

  // Product validation
  expect(product.id).toBe(1);
  expect(product.quantity).toBe(2);
  console.log("Product:", product.title);

  expect(product.total).toBe(product.price * product.quantity);

  // validation of cart total
  expect(addBody.total).toBe(product.total);

  console.log(
    `Added Product: ${product.title} | Price: ${product.price} | Qty: ${product.quantity} | Product Total: ${product.total} | Cart Total: ${addBody.total}`
  );

  // Schema Validation

  const schema = {
    type: "object",
    required: ["id", "products", "total"],
    properties: {
      id: { type: "number" },
      products: { type: "array" },
      total: { type: "number" }
    }
  };

  const isValid = validateSchema(schema, addBody);

  expect(isValid).toBe(true);

  console.log("API flow test completed successfully");
});