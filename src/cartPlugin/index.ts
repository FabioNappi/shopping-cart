import { FastifyInstance } from "fastify"
import { handler as getCartHandler, schema as getCartSchema } from "./getCart"
import { handler as addProductHandler, schema as addProductSchema } from "./addProduct"
import { handler as deleteProductHandler, schema as deleteProductSchema } from "./deleteProduct"
import { handler as setDiscountHandler, schema as setDiscountSchema } from "./setDiscount"
import { ErrorResponse } from "../schemas"
import { setupDatabase } from "../data/mongo-connector"

async function cartPlugin(server: FastifyInstance) {
  await setupDatabase(server)

  server.decorate('cart', {
    products: [],
    discount: undefined,
  })

  server.decorateReply('sendError', function sendError(code: number, error: ErrorResponse) {
    this.code(code).send(error)
  })

  server.get('/', { schema: getCartSchema }, getCartHandler)

  server.post('/products', { schema: addProductSchema }, addProductHandler)

  server.delete('/products/:productId', { schema: deleteProductSchema }, deleteProductHandler)

  server.put('/discount', { schema: setDiscountSchema }, setDiscountHandler)
}

export default cartPlugin
