import { ActivateAccountCommand } from '@account/application/command';
import { AccountNotFoundException } from '@account/application/exception';
import { ActivationToken } from '@account/domain';
import { IAccountRepository } from '@account/domain/repository';
import { ICommandHandler } from '@shared-kernel/command';

export class ActivateAccountCommandHandler implements ICommandHandler<ActivateAccountCommand> {
  constructor(private _accountRepository: IAccountRepository) {}

  public async execute(command: ActivateAccountCommand): Promise<void> {
    const { activationTokenUuid } = command;
    const activationToken = new ActivationToken(activationTokenUuid);
    const account = await this._accountRepository.findByActivationToken(activationToken);

    if (account === null) {
      throw new AccountNotFoundException();
    }

    account.activate(activationToken);

    this._accountRepository.save(account);
  }
}
