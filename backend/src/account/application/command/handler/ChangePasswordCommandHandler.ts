import { ChangePasswordCommand } from '@account/application/command';
import { AccountNotFoundException } from '@account/application/exception';
import { IPasswordHashingService } from '@account/application/service/password-hashing-service';
import { ChangePasswordToken } from '@account/domain';
import { IAccountRepository } from '@account/domain/repository';
import { ICommandHandler } from '@shared-kernel/cqrs/command';

export class ChangePasswordCommandHandler implements ICommandHandler<ChangePasswordCommand> {
  constructor(
    private _accountRepository: IAccountRepository,
    private _passwordHashingService: IPasswordHashingService
  ) {}

  public async execute(command: ChangePasswordCommand): Promise<void> {
    const { password, changePasswordTokenUuid } = command;
    const changePasswordToken = new ChangePasswordToken(changePasswordTokenUuid);
    const account = await this._accountRepository.findByChangePasswordToken(changePasswordToken);

    if (account === null) {
      throw new AccountNotFoundException();
    }

    const hashedPassword = await this._passwordHashingService.hash(password);
    account.changePassword(changePasswordToken, hashedPassword);

    await this._accountRepository.save(account);
  }
}
