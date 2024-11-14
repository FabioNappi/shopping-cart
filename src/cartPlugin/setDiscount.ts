import { FastifyReply, FastifyRequest, FastifySchema } from "fastify"

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
      description: 'Discount code found and applied',
      type: 'object',
      properties: {
        code: { type: 'string' },
        type: {
          type: 'string',
          enum: [
            'fixed',
            'percentage'
          ]
        },
        amount: { type: 'number' },
      },
      required: [
        'code',
        'type',
        'amount',
      ]
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
    },
    404: {
      description: 'Discount code not found',
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
}

const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  return { hello: 'world' }
}

export {
  handler,
  schema,
}