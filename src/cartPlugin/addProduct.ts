import { FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify"
import { errorSchema, ProductReference, productReferenceSchema, productSchema } from "../schemas"

const schema: FastifySchema = {
  body: productReferenceSchema,
  response: {
    201: {
      ...productSchema,
      description: 'Product added to cart',
    },
    400: {
      ...errorSchema,
      description: 'Validation error',
    },
    404: {
      ...errorSchema,
      description: 'Product not found',
    },
  }
}

async function handler(this: FastifyInstance, request: FastifyRequest<{Body: ProductReference}>, reply: FastifyReply) {
  const productToAdd = request.body
  const product = await this.productsCollection.findOne({ productId: productToAdd.productId })
  if (!product) {
    return reply.sendError(404, { error: 'PRODUCT_NOT_FOUND' })
  }

  const productIndex = this.cart.products.findIndex(product => product.productId === productToAdd.productId)
  if (productIndex === -1) {
    this.cart.products.push(productToAdd)
  } else {
    this.cart.products[productIndex].quantity += productToAdd.quantity
  }
  reply.code(201).send(product)
}

export {
  handler,
  schema,
}