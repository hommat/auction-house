import { CreateAccountCommand } from '@account/application/command';
import {
  EmailAlreadyInUseException,
  LoginAlreadyInUseException,
} from '@account/application/exception';
import { IPasswordHashingService } from '@account/application/service/password-hashing-service';
import { Account, Email, Login } from '@account/domain';
import { IAccountRepository } from '@account/domain/repository';
import { ICommandHandler } from '@shared-kernel/command';

export class CreateAccountCommandHandler implements ICommandHandler<CreateAccountCommand> {
  constructor(
    private _accountRepository: IAccountRepository,
    private _passwordHashingService: IPasswordHashingService
  ) {}

  public async execute(command: CreateAccountCommand): Promise<void> {
    const { email, login, password } = command;

    const accountsWithLoginOrEmail = await this._accountRepository.findWithLoginOrEmail(
      login,
      email
    );

    if (this.isLoginAlreadyInUse(login, accountsWithLoginOrEmail)) {
      throw new LoginAlreadyInUseException();
    }

    if (this.isEmailAlreadyInUse(email, accountsWithLoginOrEmail)) {
      throw new EmailAlreadyInUseException();
    }

    const accountId = await this._accountRepository.generateId();
    const hashedPassword = await this._passwordHashingService.hash(password);
    const account = new Account(accountId, email, login, hashedPassword);

    this._accountRepository.create(account);
  }

  private isLoginAlreadyInUse(login: Login, accountsWithLoginOrEmail: Account[]): boolean {
    return accountsWithLoginOrEmail.some((account) => account.login.equals(login));
  }

  private isEmailAlreadyInUse(email: Email, accountsWithLoginOrEmail: Account[]): boolean {
    return accountsWithLoginOrEmail.some((account) => account.email.equals(email));
  }
}
