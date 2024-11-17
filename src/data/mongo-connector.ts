import fastifyPlugin from "fastify-plugin";
import fastifyMongodb, { mongodb } from "@fastify/mongodb";
import { FastifyInstance } from "fastify";
import { Product } from "./product";
import { Discount } from "./discount";

const UNIQUE_PRODUCT_FIELD = 'productId'
const UNIQUE_DISCOUNT_FIELD = 'code'

const conditionalCreateUniqueIndex = async <T extends mongodb.BSON.Document = never>(collection: mongodb.Collection<T>, index: string) => {
  if (!(await collection.indexExists(index))) {
    await collection.createIndex(index, { name: index, unique: true })
  }
}

export const setupDatabase = async (server: FastifyInstance) => {
  if (server.mongo.db === undefined) {
    throw new Error('could not connect to database')
  }

  const productsCollection = server.mongo.db.collection<Product>('products')
  const discountsCollection = server.mongo.db.collection<Discount>('discounts')
  await conditionalCreateUniqueIndex(productsCollection, UNIQUE_PRODUCT_FIELD)
  await conditionalCreateUniqueIndex(discountsCollection, UNIQUE_DISCOUNT_FIELD)
  server.decorate('productsCollection', productsCollection)
  server.decorate('discountsCollection', discountsCollection)
}

async function mongoConnector(fastify:FastifyInstance) {
  fastify.register(fastifyMongodb, {
    url: 'mongodb://localhost:27017/mydb',
  })
}

export default fastifyPlugin(mongoConnector)
