import { LoginTooLongException, LoginTooShortException } from '@account/domain/exception/login';
import {
  LoginMaxLengthSpecification,
  LoginMinLengthSpecification,
} from '@account/domain/specification/login';

export class Login {
  private constructor(private _value: string) {}

  public static create(value: string): Login {
    const login = new Login(value);

    const loginMinLengthSpecification = new LoginMinLengthSpecification();
    if (!loginMinLengthSpecification.isSatisfiedBy(login)) {
      throw new LoginTooShortException();
    }

    const loginMaxLengthSpecification = new LoginMaxLengthSpecification();
    if (!loginMaxLengthSpecification.isSatisfiedBy(login)) {
      throw new LoginTooLongException();
    }

    return new Login(value);
  }

  public equals(anotherLogin: Login): boolean {
    return this._value === anotherLogin.value;
  }

  public get value(): string {
    return this._value;
  }
}
