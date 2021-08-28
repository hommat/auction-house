import { CreateAccountCommand } from '@account/application/command';
import {
  EmailAlreadyInUseException,
  LoginAlreadyInUseException,
} from '@account/application/exception';
import { INotifyService } from '@account/application/service/notify-service';
import { IPasswordHashingService } from '@account/application/service/password-hashing-service';
import { Account, AccountId, ActivationToken, Email, Login } from '@account/domain';
import { IAccountRepository } from '@account/domain/repository';
import { ICommandHandler } from '@shared-kernel/cqrs/command';
import { UuidGenerator } from '@shared-kernel/factory';

export class CreateAccountCommandHandler implements ICommandHandler<CreateAccountCommand> {
  constructor(
    private _accountRepository: IAccountRepository,
    private _notifyService: INotifyService,
    private _passwordHashingService: IPasswordHashingService
  ) {}

  public async execute(command: CreateAccountCommand): Promise<void> {
    const { email, login, password } = command;

    const accountsWithLoginOrEmail = await this._accountRepository.findByLoginOrEmail(login, email);

    if (this.isLoginAlreadyInUse(login, accountsWithLoginOrEmail)) {
      throw new LoginAlreadyInUseException();
    }

    if (this.isEmailAlreadyInUse(email, accountsWithLoginOrEmail)) {
      throw new EmailAlreadyInUseException();
    }

    const accountId = new AccountId(UuidGenerator.generate());
    const hashedPassword = await this._passwordHashingService.hash(password);
    const activationToken = new ActivationToken(UuidGenerator.generate());
    const account = Account.createDeactivated(
      accountId,
      email,
      login,
      hashedPassword,
      activationToken
    );

    await this._accountRepository.create(account);
    this._notifyService.sendAccountActivationMessage(account);
  }

  private isLoginAlreadyInUse(login: Login, accountsWithLoginOrEmail: Account[]): boolean {
    return accountsWithLoginOrEmail.some((account) => account.login.equals(login));
  }

  private isEmailAlreadyInUse(email: Email, accountsWithLoginOrEmail: Account[]): boolean {
    return accountsWithLoginOrEmail.some((account) => account.email.equals(email));
  }
}
