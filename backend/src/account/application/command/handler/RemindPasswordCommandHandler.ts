import { RemindPasswordCommand } from '@account/application/command';
import { INotifyService } from '@account/application/service/notify-service';
import { ChangePasswordToken } from '@account/domain';
import { IAccountRepository } from '@account/domain/repository';
import { ICommandHandler } from '@shared-kernel/cqrs/command';
import { UuidGenerator } from '@shared-kernel/factory';

export class RemindPasswordCommandHandler implements ICommandHandler<RemindPasswordCommand> {
  constructor(
    private _accountRepository: IAccountRepository,
    private _notifyService: INotifyService
  ) {}

  public async execute(command: RemindPasswordCommand): Promise<void> {
    const { email } = command;
    const account = await this._accountRepository.findByEmail(email);

    if (account === null) {
      return;
    }

    const changePasswordToken = new ChangePasswordToken(UuidGenerator.generate());
    account.setChangePasswordToken(changePasswordToken);

    await this._accountRepository.save(account);
    this._notifyService.sendRemindPasswordMessage(account);
  }
}
