import { CreateThirdPartyAccountCommand } from '@account/application/command';
import { EmailAlreadyInUseException } from '@account/application/exception';
import { Account, AccountId } from '@account/domain';
import { IAccountRepository } from '@account/domain/repository';
import { ICommandHandler } from '@shared-kernel/cqrs/command';
import { UuidGenerator } from '@shared-kernel/factory';

export class CreateThirdPartyAccountCommandHandler
  implements ICommandHandler<CreateThirdPartyAccountCommand>
{
  constructor(private _accountRepository: IAccountRepository) {}

  public async execute(command: CreateThirdPartyAccountCommand): Promise<void> {
    const { email, thirdPartyAccountId, thirdPartyAccountService } = command;

    const accountWithEmail = await this._accountRepository.findByEmail(email);
    if (accountWithEmail !== null) {
      throw new EmailAlreadyInUseException();
    }

    const accountId = new AccountId(UuidGenerator.generate());
    const account = Account.createThirdParty(
      accountId,
      email,
      thirdPartyAccountId,
      thirdPartyAccountService
    );

    await this._accountRepository.create(account);
  }
}
