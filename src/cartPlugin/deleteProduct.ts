import { FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify"
import { errorSchema } from "../schemas"

const schema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      quantity: { type: 'number' },
    }
  },
  params: {
    type: 'object',
    properties: {
      productId: { type: 'string' },
    },
    required: [
      'productId'
    ]
  },
  response: {
    204: {
      description: 'Product deleted',
      type: 'null',
    },
    404: {
      ...errorSchema,
      description: 'Product not found',
    }
  }
} as const

async function handler(this: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  return { hello: 'world' }
}

export {
  handler,
  schema,
}