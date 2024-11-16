import { FromSchema } from "json-schema-to-ts"

const errorCodes = [
  'PRODUCT_NOT_FOUND',
  'DISCOUNT_NOT_FOUND',
  'INVALID_QUANTITY',
] as const

type ErrorCode = typeof errorCodes[number]

export const errorSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'string',
      enum: errorCodes
    },
    message: { type: 'string' },
  },
  required: [
    'error'
  ]
} as const

export type ErrorResponse = FromSchema<typeof errorSchema>
