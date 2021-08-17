import { FastifyReply } from 'fastify';

import { CommandInvalidInputException } from '@shared-kernel/command/exception';
import { ValidationFailedException } from '@shared-kernel/validation';
import { HttpStatusCode } from '@ui/http/HttpStatusCode';
import { IHttpV1ErrorHandler } from '@ui/http/rest/v1';

export class HttpRestV1ErrorHandler implements IHttpV1ErrorHandler {
  public handle(err: Error, rep: FastifyReply): FastifyReply {
    switch (err.constructor) {
      case CommandInvalidInputException:
        const commandInvalidInputException = err as CommandInvalidInputException;

        return rep.code(HttpStatusCode.BAD_REQUEST).send({
          errors: commandInvalidInputException.validationExceptions.map((validationException) =>
            validationException.toDTO()
          ),
        });
      case ValidationFailedException:
        const validationFailedException = err as ValidationFailedException;

        return rep.code(HttpStatusCode.BAD_REQUEST).send(validationFailedException.toDTO());
      default:
        return rep.code(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }
}
