import { Login, Password } from '@account/domain';
import { SignInQueryInput } from '@security/read-model/input';
import { Query } from '@shared-kernel/cqrs/query';

export class SingInQuery extends Query {
  public static create(i: SignInQueryInput): SingInQuery {
    const [login, loginValidationErr] = this.createSafe(() => Login.create(i.login));
    const [password, passwordValidationErr] = this.createSafe(() => Password.create(i.password));

    this.throwInvalidInputExceptionIfNeeded(loginValidationErr, passwordValidationErr);

    return new SingInQuery(login!, password!);
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
