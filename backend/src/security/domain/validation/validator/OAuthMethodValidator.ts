import { OAuthMethod } from '@security/domain';
import {
  OAuthMethodDataTypeSpecification,
  OAuthMethodValueSpecification,
} from '@security/domain/specification/o-auth-method';
import { ValidationField } from '@security/domain/validation';
import { ValueObjectValidator, Validator } from '@shared-kernel/validation';

export class OAuthMethodValidator extends ValueObjectValidator<OAuthMethod> {
  protected _validator = new Validator(ValidationField.O_AUTH_METHOD, this._oAuthMethod);
  protected _specifications = [
    new OAuthMethodDataTypeSpecification(),
    new OAuthMethodValueSpecification(),
  ];

  constructor(private _oAuthMethod: OAuthMethod) {
    super();
  }
}
