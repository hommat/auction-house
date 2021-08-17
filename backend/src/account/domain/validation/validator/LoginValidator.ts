import { Login } from '@account/domain';
import {
  LoginDataTypeSpecification,
  LoginMaxLengthSpecification,
  LoginMinLengthSpecification,
} from '@account/domain/specification/login';
import { ValidationField } from '@account/domain/validation';
import { ValueObjectValidator, Validator } from '@shared-kernel/validation';

export class LoginValidator extends ValueObjectValidator<Login> {
  protected _validator = new Validator(ValidationField.LOGIN, this._login);
  protected _specifications = [
    new LoginDataTypeSpecification(),
    new LoginMaxLengthSpecification(),
    new LoginMinLengthSpecification(),
  ];

  constructor(private _login: Login) {
    super();
  }
}
