import { FromSchema } from "json-schema-to-ts"

export const productSchema = {
  type: 'object',
  properties: {
    productId: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
  },
  required: [
    'productId',
    'price',
  ]
} as const

export type Product = FromSchema<typeof productSchema>
