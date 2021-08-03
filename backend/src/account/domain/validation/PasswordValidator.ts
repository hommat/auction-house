import { Password } from '@account/domain';
import {
  PasswordMaxLengthSpecification,
  PasswordMinLengthSpecification,
} from '@account/domain/specification/password';
import { ValueObjectValidator, Validator } from '@shared-kernel/validation';

export class PasswordValidator extends ValueObjectValidator<Password> {
  protected _validator = new Validator('password', this._password);
  protected _specifications = [
    new PasswordMinLengthSpecification(),
    new PasswordMaxLengthSpecification(),
  ];

  constructor(private _password: Password) {
    super();
  }
}
