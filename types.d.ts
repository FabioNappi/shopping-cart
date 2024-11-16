import { mongodb } from "@fastify/mongodb"
import { Discount, ErrorResponse, Product, ProductReference } from "./src/schemas"

export interface Cart {
  products: ProductReference[],
  discount: string | undefined
}

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