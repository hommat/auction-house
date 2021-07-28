import {
  PasswordTooLongException,
  PasswordTooShortException,
} from '@account/domain/exception/password';
import {
  PasswordMaxLengthSpecification,
  PasswordMinLengthSpecification,
} from '@account/domain/specification/password';

export class Password {
  private constructor(private _value: string) {}

  public static create(value: string): Password {
    const password = new Password(value);

    const passwordMinLengthSpecification = new PasswordMinLengthSpecification();
    if (!passwordMinLengthSpecification.isSatisfiedBy(password)) {
      throw new PasswordTooShortException();
    }

    const passwordMaxLengthSpecification = new PasswordMaxLengthSpecification();
    if (!passwordMaxLengthSpecification.isSatisfiedBy(password)) {
      throw new PasswordTooLongException();
    }

    return new Password(value);
  }

  public copy(): Password {
    return new Password(this._value);
  }

  public get value(): string {
    return this._value;
  }
}
