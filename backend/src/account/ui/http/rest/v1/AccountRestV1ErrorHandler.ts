import { FastifyReply } from 'fastify';

import {
  AccountNotFoundException,
  EmailAlreadyInUseException,
  LoginAlreadyInUseException,
} from '@account/application/exception';
import {
  AccountNotDeactivatedException,
  InvalidActivationTokenException,
} from '@account/domain/exception/account';
import { HttpStatusCode } from '@ui/http';
import { HttpRestV1ErrorHandler } from '@ui/http/rest/v1';

export class AccountRestV1ErrorHandler extends HttpRestV1ErrorHandler {
  public handle(err: Error, rep: FastifyReply): FastifyReply {
    switch (err.constructor) {
      case AccountNotDeactivatedException:
      case InvalidActivationTokenException:
        return rep.code(HttpStatusCode.CONFLICT);
      case AccountNotFoundException:
        return rep.code(HttpStatusCode.NOT_FOUND);
      case EmailAlreadyInUseException:
        return rep.code(HttpStatusCode.CONFLICT).send((err as EmailAlreadyInUseException).toDTO());
      case LoginAlreadyInUseException:
        return rep.code(HttpStatusCode.CONFLICT).send((err as LoginAlreadyInUseException).toDTO());
      default:
        return super.handle(err, rep);
    }
  }
}
