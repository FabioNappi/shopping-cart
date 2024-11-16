import { FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify"
import { discountSchema, errorSchema } from "../schemas"
import { FromSchema } from "json-schema-to-ts"

const body = {
  type: 'object',
  properties: {
    code: { type: 'string' }
  },
  required: [
    'code'
  ]
} as const

type Body = FromSchema<typeof body>

const schema: FastifySchema = {
  body,
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

async function handler(this: FastifyInstance, request: FastifyRequest<{Body: Body}>, reply: FastifyReply) {
  const foundDiscount = await this.discountsCollection.findOne({ code: request.body.code })
  if (foundDiscount === null) {
    return reply.sendError(404, { error: 'DISCOUNT_NOT_FOUND' })
  }

  this.cart.discount = request.body.code
  reply.send(foundDiscount)
}

export {
  handler,
  schema,
}