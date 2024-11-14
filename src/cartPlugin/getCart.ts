import { FastifyReply, FastifyRequest, FastifySchema } from "fastify"

const schema: FastifySchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        cart: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'string' },
              description: { type: 'string' },
              price: { type: 'number' },
              quantity: { type: 'number' },
              subTotal: { type: 'number' },
            },
            required: [
              'productId',
              'description',
              'price',
              'quantity',
              'subTotal',
            ]
          }
        },
        total: { type: 'number' }
      },
      required: [
        'cart',
        'total'
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