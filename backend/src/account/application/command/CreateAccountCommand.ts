import { Login, Password } from '@account/domain';
import { Command } from '@shared-kernel/command';

export class CreateAccountCommand extends Command {
  public static create(plainLogin: string, plainPassword: string): CreateAccountCommand {
    const [login, loginValidationErr] = this.createSafe(() => Login.create(plainLogin));
    const [password, passwordValidationErr] = this.createSafe(() => Password.create(plainPassword));

    this.throwInvalidInputExceptionIfNeeded(loginValidationErr, passwordValidationErr);

    return new CreateAccountCommand(login!, password!);
  }

  private constructor(private _login: Login, private _password: Password) {
    super();
  }

  public get login(): Login {
    return this._login;
  }

  public get password(): Password {
    return this._password;
  }
}
