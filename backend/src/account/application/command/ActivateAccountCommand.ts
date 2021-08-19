import { Command } from '@shared-kernel/command';
import { Uuid } from '@shared-kernel/domain';

export class ActivateAccountCommand extends Command {
  public static create(plainActivationTokenUuid: string): ActivateAccountCommand {
    const [activationTokenUuid, activationTokenUuidValidationErr] = this.createSafe(() =>
      Uuid.create(plainActivationTokenUuid)
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
