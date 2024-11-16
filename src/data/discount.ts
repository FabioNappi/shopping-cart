import { FromSchema } from "json-schema-to-ts"

export const discountSchema = {
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
} as const

export type Discount = FromSchema<typeof discountSchema>
