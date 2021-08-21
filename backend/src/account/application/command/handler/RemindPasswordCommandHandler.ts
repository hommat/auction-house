import { RemindPasswordCommand } from '@account/application/command';
import { INotifyService } from '@account/application/service/notify-service';
import { IAccountRepository } from '@account/domain/repository';
import { ICommandHandler } from '@shared-kernel/cqrs/command';

export class RemindPasswordCommandHandler implements ICommandHandler<RemindPasswordCommand> {
  constructor(
    private _accountRepository: IAccountRepository,
    private _notifyService: INotifyService
  ) {}

  public async execute(command: RemindPasswordCommand): Promise<void> {
    const { email } = command;
    const account = await this._accountRepository.findByEmail(email);

    if (account !== null) {
      this._notifyService.sendRemindPasswordMessage(account);
    }
  }
}
