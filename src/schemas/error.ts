import { FromSchema } from "json-schema-to-ts"

export const errorSchema = {
  type: 'object',
  properties: {
    error: { type: 'string' },
    message: { type: 'string' },
  },
  required: [
    'error'
  ]
} as const

export type ErrorResponse = FromSchema<typeof errorSchema>
