import { PasswordValidator } from '@account/domain/validation/validator';

export class Password {
  private constructor(private _value: string) {}

  public static create(value: string): Password {
    const password = new Password(value);

    new PasswordValidator(password).validate();

    return password;
  }

  public equals(anotherPassword: Password): boolean {
    return this._value === anotherPassword.value;
  }

  public get value(): string {
    return this._value;
  }
}
