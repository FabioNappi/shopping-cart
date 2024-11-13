import { FastifyReply, FastifyRequest } from "fastify"

const schema = {}

const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  return { hello: 'world' }
}

export {
  handler,
  schema,
}