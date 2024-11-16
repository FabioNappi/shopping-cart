import { FromSchema } from "json-schema-to-ts"

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
