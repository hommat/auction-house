import { FastifyRequest, FastifyReply } from 'fastify';

import { CreateAccountCommand } from '@account/application/command';
import { CreateAccountCommandInput } from '@account/application/command/input';
import { IAccountRestV1Controller } from '@account/ui/http/rest/v1';
import { CreateAccountDTO } from '@account/ui/http/rest/v1/dto';
import { ICommandDispatcher } from '@shared-kernel/cqrs/command';
import { HttpStatusCode } from '@ui/http';

export class AccountRestV1Controller implements IAccountRestV1Controller {
  constructor(private _commandDispatcher: ICommandDispatcher) {}

  public async createAccount(req: FastifyRequest, rep: FastifyReply): Promise<void> {
    const { email, login, password } = req.body as CreateAccountDTO;
    const command = CreateAccountCommand.create(
      new CreateAccountCommandInput(email, login, password)
    );

    await this._commandDispatcher.dispatch(command);

    rep.code(HttpStatusCode.CREATED).send();
  }
}
