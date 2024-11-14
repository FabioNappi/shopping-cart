import { ProductReference } from "./src/schemas"

export interface Cart {
  products: ProductReference[],
  discount: string | undefined
}

declare module 'fastify' {
  interface FastifyInstance {
    cart: Cart
  }
}