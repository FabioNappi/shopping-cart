import { mongodb } from "@fastify/mongodb"
import { Cart, ErrorResponse } from "./schemas/index.ts"
import { Discount, Product } from "./data/index.ts"

declare module 'fastify' {
  interface FastifyInstance {
    cart: Cart
    productsCollection: mongodb.Collection<Product>
    discountsCollection: mongodb.Collection<Discount>
  }

  interface FastifyReply {
    sendError: (code: number, error: ErrorResponse) => void
  }
}
