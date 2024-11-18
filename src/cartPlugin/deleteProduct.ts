import { FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify"
import { errorSchema } from "../schemas/index.js"
import { FromSchema } from "json-schema-to-ts"

const params = {
  type: 'object',
  properties: {
    productId: { type: 'string' },
  },
  required: [
    'productId'
  ]
} as const

type Params = FromSchema<typeof params>

const querystring = {
  type: 'object',
  properties: {
    quantity: { type: 'number' },
  }
} as const

type Querystring = FromSchema<typeof querystring>

const schema: FastifySchema = {
  tags: ['Products'],
  querystring,
  params,
  response: {
    204: {
      description: 'Product deleted',
      type: 'null',
    },
    400: {
      ...errorSchema,
      description: 'Invalid quantity',
    },
    404: {
      ...errorSchema,
      description: 'Product not found',
    }
  }
}

async function handler(this: FastifyInstance, request: FastifyRequest<{Params: Params, Querystring: Querystring}>, reply: FastifyReply) {
  const productIndex = this.cart.products.findIndex(product => product.productId === request.params.productId)
  if (productIndex === -1) {
    return reply.sendError(404, {
      error: 'PRODUCT_NOT_FOUND',
      message: `product '${request.params.productId}' not found in cart`
    })
  }
  
  const quantityToRemove = request.query.quantity ?? this.cart.products[productIndex].quantity
  if (quantityToRemove > this.cart.products[productIndex].quantity) {
    return reply.sendError(400, { error: 'INVALID_QUANTITY' })
  }
  
  this.cart.products[productIndex].quantity -= quantityToRemove
  if (this.cart.products[productIndex].quantity < 1) {
    this.cart.products.splice(productIndex, 1)
  }
  reply.code(204)
}

export {
  handler,
  schema,
}