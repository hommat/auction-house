import { LoginValidator } from '@account/domain/validation/validator';

export class Login {
  public static create(value: string): Login {
    const login = new Login(value);

    new LoginValidator(login).validate();

    return login;
  }

  constructor(private _value: string) {}

  public equals(anotherLogin: Login): boolean {
    return this._value === anotherLogin.value;
  }

  public get value(): string {
    return this._value;
  }
}
