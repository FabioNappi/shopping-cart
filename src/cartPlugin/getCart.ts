import { FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify"
import { productSchema } from "../schemas"
import { FromSchema } from "json-schema-to-ts"

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
  response: {
    200: reply
  }
}

async function handler(this: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  // TODO get sul db per prendere description e price per ciascun prodotto
  return {
    cart: [],
    total: 0,
  }
}

export {
  handler,
  schema,
}

export type {
  Reply
}