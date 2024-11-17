import { FastifyError, FastifyInstance, FastifyReply } from "fastify";

export async function errorHandler(this: FastifyInstance, error: FastifyError, _: unknown, reply: FastifyReply) {
  if (error.validation) {
    const errorPath = `${error.validationContext}${error.validation[0].instancePath}`
    return reply.sendError(400, {
      error: 'VALIDATION_ERROR',
      message: `${errorPath}: ${error.validation[0].message}`
    })
  }

  reply.sendError(error.statusCode ?? 500, { error: 'UNKNOWN_ERROR' })
}