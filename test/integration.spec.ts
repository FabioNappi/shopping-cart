import { setupTest } from "./utils"
import {describe, test} from '@jest/globals';

describe('Integration tests', async () => {
  await setupTest()

  describe('GET /cart', () => {
    test('Cart is empty', () => {
      // TODO
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

    test('Product added to cart', () => {
      // TODO
    })
  })

  describe('DELETE /cart/products/:productId', () => {
    test('Invalid querystring', () => {
      // TODO
    })

    test('Product not found in cart', () => {
      // TODO
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

    test('Discount is applied', () => {
      // TODO
    })
  })
})
