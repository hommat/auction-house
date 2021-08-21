import { FastifyReply } from 'fastify';

import { InvalidInputException } from '@shared-kernel/cqrs/exception';
import { ValidationFailedException } from '@shared-kernel/validation';
import { HttpStatusCode } from '@ui/http/HttpStatusCode';
import { IHttpV1ErrorHandler } from '@ui/http/rest/v1';

export class HttpRestV1ErrorHandler implements IHttpV1ErrorHandler {
  public handle(err: Error, rep: FastifyReply): FastifyReply {
    switch (err.constructor) {
      case InvalidInputException:
        return rep.code(HttpStatusCode.BAD_REQUEST).send({
          errors: (err as InvalidInputException).validationExceptions.map((validationException) =>
            validationException.toDTO()
          ),
        });
      case ValidationFailedException:
        return rep
          .code(HttpStatusCode.BAD_REQUEST)
          .send((err as ValidationFailedException).toDTO());
      default:
        return rep.code(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }
}
