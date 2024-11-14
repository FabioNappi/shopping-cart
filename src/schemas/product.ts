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

export const productReferenceSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    productId: { type: 'string' },
    quantity: {
      type: 'number',
      minimum: 1,
    },
  },
  required: [
    'productId',
    'quantity',
  ]
} as const

export type ProductReference = FromSchema<typeof productReferenceSchema>
