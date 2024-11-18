import fastify, { FastifyInstance } from "fastify"
import cartPlugin from "./cartPlugin/index.js"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import mongoConnector from "./data/mongo-connector.js"

export async function launchServer(): Promise<FastifyInstance> {
  const server = fastify({
    logger: true,
  })
  
  server.register(mongoConnector)
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Shopping Cart',
        description: 'Shopping cart management exercize.',
        version: '1.0.0'
      }
    }
  })
  server.register(fastifySwaggerUi)
  
  server.register(cartPlugin, { prefix: '/cart' })
  
  // Run the server!
  server.listen({ host: '0.0.0.0', port: 3000 }, function (err) {
    if (err) {
      server.log.error(err)
      process.exit(1)
    }
  })

  return server
}
