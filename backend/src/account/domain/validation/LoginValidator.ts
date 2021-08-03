import { Login } from '@account/domain';
import {
  LoginMaxLengthSpecification,
  LoginMinLengthSpecification,
} from '@account/domain/specification/login';
import { ValueObjectValidator, Validator } from '@shared-kernel/validation';

export class LoginValidator extends ValueObjectValidator<Login> {
  protected _validator = new Validator('login', this._login);
  protected _specifications = [
    new LoginMaxLengthSpecification(),
    new LoginMinLengthSpecification(),
  ];

  constructor(private _login: Login) {
    super();
  }
}
