import { ThirdPartyAccountId } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MinLengthSpecification } from '@shared-kernel/specification/string';
import { IValidable, ValidationError, ValidationErrorFactory } from '@shared-kernel/validation';

export class ThirdPartyAccountIdMinLengthSpecification
  extends CompositeSpecification<ThirdPartyAccountId>
  implements IValidable
{
  private readonly MIN_LENGTH = 1;

  private _minLengthSpecification = new MinLengthSpecification(this.MIN_LENGTH);

  public isSatisfiedBy(candidate: ThirdPartyAccountId): boolean {
    return this._minLengthSpecification.isSatisfiedBy(candidate.value);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createTooShort(this.MIN_LENGTH);
  }
}
