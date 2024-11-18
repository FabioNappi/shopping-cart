import { FastifyInstance } from "fastify"
import { setupTest } from "./utils"

describe('Integration tests', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = await setupTest()
  })

  afterAll(async () => {
    await server.close()
  })

  describe('GET /cart', () => {
    test('Cart is empty', async () => {
      const response = await server.inject({
        method: 'GET',
        path: '/cart',
      })

      expect(response.statusCode).toStrictEqual(200)
      expect(JSON.parse(response.payload)).toStrictEqual({
        cart: [],
        total: 0,
      })
    })

    test('Cart has some product, no discount', () => {
      // TODO
    })

    test('Cart has some product, fixed value discount', () => {
      // TODO
    })

    test('Cart has some product, percentage value discount', () => {
      // TODO
    })
  })

  describe('POST /cart/products', () => {    
    test('Invalid body', () => {
      // TODO
    })

    test('Unknown product', () => {
      // TODO
    })

    test('Product added to cart', async () => {
      const response = await server.inject({
        method: 'POST',
        path: '/cart/products',
        payload: {
          productId: 'product-1',
          quantity: 3,
        }
      })

      expect(response.statusCode).toStrictEqual(201)
      expect(JSON.parse(response.payload)).toStrictEqual({
        productId: 'product-1',
        price: 111,
      })
    })
  })

  describe('DELETE /cart/products/:productId', () => {
    test('Invalid querystring', () => {
      // TODO
    })

    test('Product not found in cart', async () => {
      const response = await server.inject({
        method: 'DELETE',
        path: '/cart/products/unknown-product',
      })

      expect(response.statusCode).toStrictEqual(404)
      expect(JSON.parse(response.payload)).toStrictEqual({
        error: 'PRODUCT_NOT_FOUND',
        message: 'product \'unknown-product\' not found in cart',
      })

    })

    test('No quantity specified - product is completely removed from cart', () => {
      // TODO
    })

    test('Quantity specified - product quantity is decremented accordingly', () => {
      // TODO
    })
  })

  describe('PUT /cart/discount', () => {
    test('Invalid body', () => {
      // TODO
    })

    test('Unknown discount', () => {
      // TODO
    })

    test('Discount is applied', async () => {
      const response = await server.inject({
        method: 'PUT',
        path: '/cart/discount',
        payload: {
          code: 'discount-1',
        }
      })

      expect(response.statusCode).toStrictEqual(200)
      expect(JSON.parse(response.payload)).toStrictEqual({
        code: 'discount-1',
        amount: 11,
        type: 'fixed',
      })

    })
  })
})
