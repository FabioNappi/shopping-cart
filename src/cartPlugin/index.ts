import { FastifyInstance } from "fastify"
import { handler as getCartHandler, schema as getCartSchema } from "./getCart"
import { handler as addProductHandler, schema as addProductSchema } from "./addProduct"
import { handler as deleteProductHandler, schema as deleteProductSchema } from "./deleteProduct"
import { handler as setDiscountHandler, schema as setDiscountSchema } from "./setDiscount"
import { Cart } from "../../types"

async function cartPlugin(server: FastifyInstance) {
  const initialCart: Cart = {
    products: [],
    discount: undefined,
  }
  server.decorate('cart', initialCart)

  server.get('/', { schema: getCartSchema }, getCartHandler)

  server.post('/products', { schema: addProductSchema }, addProductHandler)

  server.delete('/products/:productId', { schema: deleteProductSchema }, deleteProductHandler)

  server.put('/discount', { schema: setDiscountSchema }, setDiscountHandler)
}

export default cartPlugin
