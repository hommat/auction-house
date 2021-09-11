import { ThirdPartyAccountService, ThirdPartyAccountServiceType } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { ValueSpecification } from '@shared-kernel/specification/array';
import { IValidable, ValidationError, ValidationErrorFactory } from '@shared-kernel/validation';

export class ThirdPartyAccountServiceValueSpecification
  extends CompositeSpecification<ThirdPartyAccountService>
  implements IValidable
{
  private _availableValues = Object.values(ThirdPartyAccountServiceType);
  private _formatSpecification = new ValueSpecification(this._availableValues);

  public isSatisfiedBy(candidate: ThirdPartyAccountService): boolean {
    return this._formatSpecification.isSatisfiedBy(candidate.type);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createValue(this._availableValues);
  }
}
