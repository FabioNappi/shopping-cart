import fastifyPlugin from "fastify-plugin";
import fastifyMongodb from "@fastify/mongodb";
import { FastifyInstance } from "fastify";

async function mongoConnector(fastify:FastifyInstance) {
  fastify.register(fastifyMongodb, {
    url: 'mongodb://localhost:27017/mydb'
  })
}

export default fastifyPlugin(mongoConnector)
