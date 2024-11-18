import fastifyPlugin from "fastify-plugin";
import fastifyMongodb from "@fastify/mongodb";
import { FastifyInstance } from "fastify";
import { Product } from "./product.js";
import { Discount } from "./discount.js";
import { ServerOptions } from "../server.js";

export const setupDatabase = async (server: FastifyInstance) => {
  if (server.mongo.db === undefined) {
    throw new Error('could not connect to database')
  }

  const productsCollection = server.mongo.db.collection<Product>('products')
  const discountsCollection = server.mongo.db.collection<Discount>('discounts')
  server.decorate('productsCollection', productsCollection)
  server.decorate('discountsCollection', discountsCollection)
}

async function mongoConnector(fastify:FastifyInstance, options: ServerOptions) {
  fastify.register(fastifyMongodb, {
    url: options?.mongoURL ?? 'mongodb://localhost:27017/mydb',
    forceClose: true,
  })
}

export default fastifyPlugin(mongoConnector)
