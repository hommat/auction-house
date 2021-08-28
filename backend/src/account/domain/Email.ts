import { EmailValidator } from '@account/domain/validation/validator';

export class Email {
  public static create(value: string): Email {
    const email = new Email(value);

    new EmailValidator(email).validate();

    return email;
  }

  constructor(private _value: string) {}

  public equals(anotherEmail: Email): boolean {
    return this._value === anotherEmail.value;
  }

  public get value(): string {
    return this._value;
  }
}
