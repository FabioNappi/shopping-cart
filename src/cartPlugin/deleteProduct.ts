import { FastifyReply, FastifyRequest, FastifySchema } from "fastify"

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
      description: 'Product not found',
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