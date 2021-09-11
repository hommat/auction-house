import { FastifyReply } from 'fastify';

import { HttpRestV1ErrorHandler } from '@ui/http/rest/v1';

export class SecurityRestV1ErrorHandler extends HttpRestV1ErrorHandler {
  public handle(err: Error, rep: FastifyReply): FastifyReply {
    switch (err.constructor) {
      default:
        return super.handle(err, rep);
    }
  }
}
