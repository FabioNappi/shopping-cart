import { FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify"
import { errorSchema, ProductReference, productReferenceSchema } from "../schemas"

const schema: FastifySchema = {
  body: productReferenceSchema,
  response: {
    201: {
      description: 'Product added to cart',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      ...errorSchema,
      description: 'Validation error',
    },
    404: {
      ...errorSchema,
      description: 'Product not found',
    },
  }
} as const

async function handler(this: FastifyInstance, request: FastifyRequest<{Body: ProductReference}>, reply: FastifyReply) {
  const toAdd = request.body
  // TODO verify product exists
  const productIndex = this.cart.products.findIndex(product => product.productId === toAdd.productId)
  if (productIndex === -1) {
    this.cart.products.push(toAdd)
  } else {
    this.cart.products[productIndex].quantity += toAdd.quantity
  }
  return { message: 'Product added' }
}

export {
  handler,
  schema,
}