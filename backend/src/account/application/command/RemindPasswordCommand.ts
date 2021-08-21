import { RemindPasswordCommandInput } from '@account/application/command/input';
import { Email } from '@account/domain';
import { Command } from '@shared-kernel/cqrs/command';

export class RemindPasswordCommand extends Command {
  public static create(i: RemindPasswordCommandInput): RemindPasswordCommand {
    const [email, emailValidationErr] = this.createSafe(() => Email.create(i.email));

    this.throwInvalidInputExceptionIfNeeded(emailValidationErr);

    return new RemindPasswordCommand(email!);
  }

  private constructor(private _email: Email) {
    super(true);
  }

  public get email(): Email {
    return this._email;
  }
}
