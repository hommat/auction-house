import { CreateAccountCommand } from '@account/application/command';
import { LoginAlreadyInUseException } from '@account/application/exception';
import { IPasswordHashingService } from '@account/application/service/password-hashing-service';
import { Account } from '@account/domain';
import { IAccountRepository } from '@account/domain/repository';
import { ICommandHandler } from '@shared-kernel/command';

export class CreateAccountCommandHandler implements ICommandHandler<CreateAccountCommand> {
  constructor(
    private _accountRepository: IAccountRepository,
    private _passwordHashingService: IPasswordHashingService
  ) {}

  public async execute(command: CreateAccountCommand): Promise<void> {
    const { login, password } = command;

    if (await this._accountRepository.isLoginAlreadyInUse(login)) {
      throw new LoginAlreadyInUseException();
    }

    const accountId = await this._accountRepository.generateId();
    const hashedPassword = await this._passwordHashingService.hash(password);
    const account = new Account(accountId, login, hashedPassword);

    this._accountRepository.create(account);
  }
}
