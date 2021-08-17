import { FastifyReply } from 'fastify';

import {
  EmailAlreadyInUseException,
  LoginAlreadyInUseException,
} from '@account/application/exception';
import { HttpStatusCode } from '@ui/http';
import { HttpRestV1ErrorHandler } from '@ui/http/rest/v1';

export class AccountRestV1ErrorHandler extends HttpRestV1ErrorHandler {
  public handle(err: Error, rep: FastifyReply): FastifyReply {
    switch (err.constructor) {
      case EmailAlreadyInUseException:
        const emailAlreadyInUseException = err as EmailAlreadyInUseException;

        return rep.code(HttpStatusCode.CONFLICT).send(emailAlreadyInUseException.toDTO());
      case LoginAlreadyInUseException:
        const loginAlreadyInUseException = err as LoginAlreadyInUseException;

        return rep.code(HttpStatusCode.CONFLICT).send(loginAlreadyInUseException.toDTO());
      default:
        return super.handle(err, rep);
    }
  }
}
