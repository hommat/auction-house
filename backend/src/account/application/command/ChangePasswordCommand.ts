import { Password } from '@account/domain';
import { Command } from '@shared-kernel/command';
import { Uuid } from '@shared-kernel/domain';

export class ChangePasswordCommand extends Command {
  public static create(
    plainChangePasswordUuid: string,
    plainPassword: string
  ): ChangePasswordCommand {
    const [changePasswordTokenUuid, changePasswordTokenUuidValidationErr] = this.createSafe(() =>
      Uuid.create(plainChangePasswordUuid)
    );

    const [password, passwordValidationErr] = this.createSafe(() => Password.create(plainPassword));

    this.throwInvalidInputExceptionIfNeeded(
      changePasswordTokenUuidValidationErr,
      passwordValidationErr
    );

    return new ChangePasswordCommand(password!, changePasswordTokenUuid!);
  }

  private constructor(private _password: Password, private _changePasswordTokenUuid: Uuid) {
    super();
  }

  public get password(): Password {
    return this._password;
  }

  public get changePasswordTokenUuid(): Uuid {
    return this._changePasswordTokenUuid;
  }
}
