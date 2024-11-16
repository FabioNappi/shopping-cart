import { FastifyInstance } from "fastify"
import { handler as getCartHandler, schema as getCartSchema } from "./getCart"
import { handler as addProductHandler, schema as addProductSchema } from "./addProduct"
import { handler as deleteProductHandler, schema as deleteProductSchema } from "./deleteProduct"
import { handler as setDiscountHandler, schema as setDiscountSchema } from "./setDiscount"
import { Cart } from "../../types"
import { Discount, ErrorResponse, Product } from "../schemas"

async function cartPlugin(server: FastifyInstance) {
  if (server.mongo.db === undefined) {
    throw new Error('could not connect to database')
  }
  const productsCollection = server.mongo.db.collection<Product>('products')
  const discountsCollection = server.mongo.db.collection<Discount>('discounts')
  server.decorate('productsCollection', productsCollection)
  server.decorate('discountsCollection', discountsCollection)

  const initialCart: Cart = {
    products: [],
    discount: undefined,
  }
  server.decorate('cart', initialCart)

  server.decorateReply('sendError', function sendError(code: number, error: ErrorResponse) {
    this.code(code).send(error)
  })

  server.get('/', { schema: getCartSchema }, getCartHandler)

  server.post('/products', { schema: addProductSchema }, addProductHandler)

  server.delete('/products/:productId', { schema: deleteProductSchema }, deleteProductHandler)

  server.put('/discount', { schema: setDiscountSchema }, setDiscountHandler)
}

export default cartPlugin
