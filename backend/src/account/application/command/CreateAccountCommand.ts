import { CreateAccountCommandInput } from '@account/application/command/input';
import { Email, Login, Password } from '@account/domain';
import { Command } from '@shared-kernel/cqrs/command';

export class CreateAccountCommand extends Command {
  public static create(i: CreateAccountCommandInput): CreateAccountCommand {
    const [email, emailValidationErr] = this.createSafe(() => Email.create(i.email));
    const [login, loginValidationErr] = this.createSafe(() => Login.create(i.login));
    const [password, passwordValidationErr] = this.createSafe(() => Password.create(i.password));

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
