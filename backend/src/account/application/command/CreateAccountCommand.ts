import { Email, Login, Password } from '@account/domain';
import { Command } from '@shared-kernel/cqrs/command';

export class CreateAccountCommand extends Command {
  public static create(
    plainEmail: string,
    plainLogin: string,
    plainPassword: string
  ): CreateAccountCommand {
    const [email, emailValidationErr] = this.createSafe(() => Email.create(plainEmail));
    const [login, loginValidationErr] = this.createSafe(() => Login.create(plainLogin));
    const [password, passwordValidationErr] = this.createSafe(() => Password.create(plainPassword));

    this.throwInvalidInputExceptionIfNeeded(
      emailValidationErr,
      loginValidationErr,
      passwordValidationErr
    );

    return new CreateAccountCommand(email!, login!, password!);
  }

  private constructor(private _email: Email, private _login: Login, private _password: Password) {
    super();
  }

  public get email(): Email {
    return this._email;
  }

  public get login(): Login {
    return this._login;
  }

  public get password(): Password {
    return this._password;
  }
}
