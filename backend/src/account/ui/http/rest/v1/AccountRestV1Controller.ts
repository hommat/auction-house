import { FastifyRequest, FastifyReply } from 'fastify';

import { CreateAccountCommand } from '@account/application/command';
import { CreateAccountDTO } from '@account/ui/http/rest/v1/dto';
import { ICommandDispatcher } from '@shared-kernel/command';
import { HttpStatusCode } from '@ui/http';

export class AccountRestV1Controller {
  constructor(private _commandDispatcher: ICommandDispatcher) {}

  public async createAccount(req: FastifyRequest, rep: FastifyReply): Promise<void> {
    const { login, password } = req.body as CreateAccountDTO;
    const command = CreateAccountCommand.create(login, password);

    await this._commandDispatcher.dispatch(command);

    rep.code(HttpStatusCode.CREATED).send();
  }
}