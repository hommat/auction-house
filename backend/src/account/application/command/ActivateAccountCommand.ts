import { ActivateAccountCommandInput } from '@account/application/command/input';
import { Command } from '@shared-kernel/cqrs/command';
import { Uuid } from '@shared-kernel/domain';

export class ActivateAccountCommand extends Command {
  public static create(i: ActivateAccountCommandInput): ActivateAccountCommand {
    const [activationTokenUuid, activationTokenUuidValidationErr] = this.createSafe(() =>
      Uuid.create(i.activationTokenUuid)
    );

    this.throwInvalidInputExceptionIfNeeded(activationTokenUuidValidationErr);

    return new ActivateAccountCommand(activationTokenUuid!);
  }

  private constructor(private _activationTokenUuid: Uuid) {
    super();
  }

  public get activationTokenUuid(): Uuid {
    return this._activationTokenUuid;
  }
}
