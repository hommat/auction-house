import { LoginValidator } from '@account/domain/validation/validator';

export class Login {
  private constructor(private _value: string) {}

  public static create(value: string): Login {
    const login = new Login(value);

    new LoginValidator(login).validate();

    return new Login(value);
  }

  public equals(anotherLogin: Login): boolean {
    return this._value === anotherLogin.value;
  }

  public get value(): string {
    return this._value;
  }
}
