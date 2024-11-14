import { FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify"
import { discountSchema, errorSchema } from "../schemas"

const schema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      code: { type: 'string' }
    },
    required: [
      'code'
    ]
  },
  response: {
    200: {
      ...discountSchema,
      description: 'Discount code found and applied',
    },
    400: {
      ...errorSchema,
      description: 'Validation error',
    },
    404: {
      ...errorSchema,
      description: 'Discount code not found',
    }
  }
}

async function handler(this: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  return { hello: 'world' }
}

export {
  handler,
  schema,
}