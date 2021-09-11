import { ThirdPartyAccountId } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { StringSpecification } from '@shared-kernel/specification/string';
import {
  IValidable,
  ValidationError,
  ValidationErrorFactory,
  ValidationErrorDataType,
} from '@shared-kernel/validation';

export class ThirdPartyAccountIdDataTypeSpecification
  extends CompositeSpecification<ThirdPartyAccountId>
  implements IValidable
{
  private _stringSpecification = new StringSpecification();

  public isSatisfiedBy(candidate: ThirdPartyAccountId): boolean {
    return this._stringSpecification.isSatisfiedBy(candidate.value);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createType(ValidationErrorDataType.STRING);
  }
}
