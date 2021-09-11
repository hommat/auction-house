import { OAuthMethod, OAuthMethodType } from '@security/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { ValueSpecification } from '@shared-kernel/specification/array';
import { IValidable, ValidationError, ValidationErrorFactory } from '@shared-kernel/validation';

export class OAuthMethodValueSpecification
  extends CompositeSpecification<OAuthMethod>
  implements IValidable
{
  private _availableValues = Object.values(OAuthMethodType);
  private _formatSpecification = new ValueSpecification(this._availableValues);

  public isSatisfiedBy(candidate: OAuthMethod): boolean {
    return this._formatSpecification.isSatisfiedBy(candidate.type);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createValue(this._availableValues);
  }
}
