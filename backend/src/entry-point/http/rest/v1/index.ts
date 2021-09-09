import { Registry } from '@shared-kernel/cqrs';

import { CreateAccountCommand } from '@account/application/command';
import { CreateAccountCommandHandler } from '@account/application/command/handler';
import { TempNotifyService } from '@account/application/service/notify-service/implementation';
import { Argon2PasswordHashingService } from '@account/application/service/password-hashing-service/implementation';
import { SequelizeAccountRepository } from '@account/infrastructure/repository/sequelize';

import { connect } from '../../../../scripts/db';

import { CommandDispatcher } from '@shared-kernel/cqrs/command';

import { HttpRestV1Server } from '@ui/http/rest/v1';

async function start() {
  const sequelize = await connect();

  const accountRepository = new SequelizeAccountRepository(sequelize);

  const accountNotifyService = new TempNotifyService();
  const accountPassswordHashingService = new Argon2PasswordHashingService();

  const commandRegistry = new Registry();
  commandRegistry.register(
    CreateAccountCommand.name,
    new CreateAccountCommandHandler(
      accountRepository,
      accountNotifyService,
      accountPassswordHashingService
    )
  );

  const commandDispatcher = new CommandDispatcher(commandRegistry);

  const server = new HttpRestV1Server(
    commandDispatcher,
    process.env.APP_ADDRESS!,
    +process.env.APP_PORT!
  );

  server.run();
}

start();
