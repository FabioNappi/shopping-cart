import fastify from 'fastify'
import cartPlugin from './src/cartPlugin'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import mongoConnector from './src/data/mongo-connector'

async function main() {
  const server = fastify({
    logger: true,
  })
  
  server.register(mongoConnector)
  server.register(fastifySwagger)
  server.register(fastifySwaggerUi)
  
  server.register(cartPlugin, { prefix: '/cart' })
  
  // Run the server!
  server.listen({ host: '0.0.0.0', port: 3000 }, function (err) {
    if (err) {
      server.log.error(err)
      process.exit(1)
    }
  })
}

main()

export default main

// da fare
// TODO test suite
