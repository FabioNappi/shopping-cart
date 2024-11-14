import fastify from 'fastify'
import cartPlugin from './src/cartPlugin'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'

const server = fastify({
  logger: true,
})

server.register(fastifySwagger)
server.register(fastifySwaggerUi)

server.register(cartPlugin, { prefix: '/cart' })

// Run the server!
server.listen({ port: 3000 }, function (err) {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})