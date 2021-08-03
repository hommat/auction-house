import { PasswordValidator } from '@account/domain/validation';

export class Password {
  private constructor(private _value: string) {}

  public static create(value: string): Password {
    const password = new Password(value);

    new PasswordValidator(password).validate();

    return new Password(value);
  }

  public get value(): string {
    return this._value;
  }
}
