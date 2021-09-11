import { OAuthMethod } from '@security/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { StringSpecification } from '@shared-kernel/specification/string';
import {
  IValidable,
  ValidationError,
  ValidationErrorFactory,
  ValidationErrorDataType,
} from '@shared-kernel/validation';

export class OAuthMethodDataTypeSpecification
  extends CompositeSpecification<OAuthMethod>
  implements IValidable
{
  private _stringSpecification = new StringSpecification();

  public isSatisfiedBy(candidate: OAuthMethod): boolean {
    return this._stringSpecification.isSatisfiedBy(candidate.type);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createType(ValidationErrorDataType.STRING);
  }
}
