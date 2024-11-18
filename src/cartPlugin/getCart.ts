import { FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify"
import { errorSchema } from "../schemas"
import { FromSchema } from "json-schema-to-ts"
import { Discount, productSchema } from "../data"

const reply = {
  type: 'object',
  additionalProperties: false,
  properties: {
    cart: {
      type: 'array',
      items: {
        allOf: [
          productSchema,
          {
            type: 'object',
            properties: {
              quantity: { type: 'number' },
              subTotal: { type: 'number' },
            },
            required: [
              'quantity',
              'subTotal',
            ]
          }
        ]
      }
    },
    total: { type: 'number' }
  },
  required: [
    'cart',
    'total'
  ]
} as const

type Reply = FromSchema<typeof reply>

const schema: FastifySchema = {
  tags: ['Cart'],
  response: {
    200: reply,
    404: {
      ...errorSchema,
      description: 'Product or discount not found',
    },
  }
}

async function handler(this: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const productIds = this.cart.products.map(product => product.productId)
  const foundProducts = await this.productsCollection.find({ productId: { $in: productIds } }).toArray()
  let foundDiscount: Discount | null = null
  if (this.cart.discount !== undefined) {
    foundDiscount = await this.discountsCollection.findOne({ code: this.cart.discount })
    if (foundDiscount === null) {
      return reply.sendError(404, {
        error: 'DISCOUNT_NOT_FOUND',
        message: `discount '${this.cart.discount}' not found`
      })
    }
  }

  const resultingCart: Reply['cart'] = []
  for (const product of this.cart.products) {
    const foundProduct = foundProducts.find(p => p.productId === product.productId)
    if (foundProduct === undefined) {
      return reply.sendError(404, {
        error: 'PRODUCT_NOT_FOUND',
        message: `product '${product.productId}' not found in cart`
      })
    }

    resultingCart.push({
      ...foundProduct,
      quantity: product.quantity,
      subTotal: foundProduct.price * product.quantity
    })
  }

  let resultingTotal = resultingCart.reduce((total, product) => total + product.subTotal, 0)

  switch (foundDiscount?.type) {
    case 'fixed':
      resultingTotal -= foundDiscount.amount
      break
    case 'percentage':
      resultingTotal -= Math.floor(resultingTotal * foundDiscount.amount / 100)
      break
    default:
      break
  }

  return {
    cart: resultingCart,
    total: resultingTotal,
  }
}

export {
  handler,
  schema,
}

export type {
  Reply
}