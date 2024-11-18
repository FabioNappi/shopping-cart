import { FastifyInstance } from "fastify"
import { handler as getCartHandler, schema as getCartSchema } from "./getCart.js"
import { handler as addProductHandler, schema as addProductSchema } from "./addProduct.js"
import { handler as deleteProductHandler, schema as deleteProductSchema } from "./deleteProduct.js"
import { handler as setDiscountHandler, schema as setDiscountSchema } from "./setDiscount.js"
import { ErrorResponse } from "../schemas/index.js"
import { setupDatabase } from "../data/mongo-connector.js"
import { errorHandler } from "./errorHandler.js"

async function cartPlugin(server: FastifyInstance) {
  await setupDatabase(server)

  server.decorate('cart', {
    products: [],
    discount: undefined,
  })

  server.decorateReply('sendError', function sendError(code: number, error: ErrorResponse) {
    this.code(code).send(error)
  })

  server.setErrorHandler(errorHandler)

  server.get('/', { schema: getCartSchema }, getCartHandler)

  server.post('/products', { schema: addProductSchema }, addProductHandler)

  server.delete('/products/:productId', { schema: deleteProductSchema }, deleteProductHandler)

  server.put('/discount', { schema: setDiscountSchema }, setDiscountHandler)
}

export default cartPlugin
