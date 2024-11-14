import { FastifyReply, FastifyRequest, FastifySchema } from "fastify"

const schema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      productId: { type: 'string' },
      quantity: { type: 'number' },
    },
    required: [
      'productId',
      'quantity',
    ]
  },
  response: {
    201: {
      description: 'Product added to cart',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Validation error',
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
      required: [
        'error'
      ]
    }
  }
} as const

const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  return { hello: 'world' }
}

export {
  handler,
  schema,
}