import { mongodb } from "@fastify/mongodb"
import { Cart, ErrorResponse } from "./src/schemas"
import { Discount, Product } from "./src/data"

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