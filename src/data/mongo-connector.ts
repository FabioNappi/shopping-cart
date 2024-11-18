import fastifyPlugin from "fastify-plugin";
import fastifyMongodb from "@fastify/mongodb";
import { FastifyInstance } from "fastify";
import { Product } from "./product.js";
import { Discount } from "./discount.js";

export const setupDatabase = async (server: FastifyInstance) => {
  if (server.mongo.db === undefined) {
    throw new Error('could not connect to database')
  }

  const productsCollection = server.mongo.db.collection<Product>('products')
  const discountsCollection = server.mongo.db.collection<Discount>('discounts')
  server.decorate('productsCollection', productsCollection)
  server.decorate('discountsCollection', discountsCollection)
}

async function mongoConnector(fastify:FastifyInstance) {
  fastify.register(fastifyMongodb, {
    url: process.env.MONGO_URL ?? 'mongodb://localhost:27017/mydb',
    forceClose: true,
  })
}

export default fastifyPlugin(mongoConnector)
