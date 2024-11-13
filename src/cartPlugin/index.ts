import { FastifyInstance } from "fastify"
import { handler as getCartHandler, schema as getCartSchema } from "./getCart"
import { handler as addProductHandler, schema as addProductSchema } from "./addProduct"
import { handler as deleteProductHandler, schema as deleteProductSchema } from "./deleteProduct"
import { handler as setDiscountHandler, schema as setDiscountSchema } from "./setDiscount"

async function cartPlugin(server: FastifyInstance) {
  server.get('/', { schema: getCartSchema }, getCartHandler)

  server.post('/products', { schema: addProductSchema }, addProductHandler)

  server.delete('/products/:productId', { schema: deleteProductSchema }, deleteProductHandler)

  server.put('/products/discount', { schema: setDiscountSchema }, setDiscountHandler)
}

export default cartPlugin
