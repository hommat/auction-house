import { ThirdPartyAccountService } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { StringSpecification } from '@shared-kernel/specification/string';
import {
  IValidable,
  ValidationError,
  ValidationErrorFactory,
  ValidationErrorDataType,
} from '@shared-kernel/validation';

export class ThirdPartyAccountServiceDataTypeSpecification
  extends CompositeSpecification<ThirdPartyAccountService>
  implements IValidable
{
  private _stringSpecification = new StringSpecification();

  public isSatisfiedBy(candidate: ThirdPartyAccountService): boolean {
    return this._stringSpecification.isSatisfiedBy(candidate.type);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createType(ValidationErrorDataType.STRING);
  }
}
