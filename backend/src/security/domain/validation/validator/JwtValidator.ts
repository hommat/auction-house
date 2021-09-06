import { Jwt } from '@security/domain';
import {
  JwtDataTypeSpecification,
  JwtFormatSpecification,
} from '@security/domain/specification/jwt';
import { ValidationField } from '@security/domain/validation';
import { ValueObjectValidator, Validator } from '@shared-kernel/validation';

export class JwtValidator extends ValueObjectValidator<Jwt> {
  protected _validator = new Validator(ValidationField.JWT, this._jwt);
  protected _specifications = [new JwtDataTypeSpecification(), new JwtFormatSpecification()];

  constructor(private _jwt: Jwt) {
    super();
  }
}
