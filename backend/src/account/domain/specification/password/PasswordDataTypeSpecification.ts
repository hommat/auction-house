import { Password } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { StringSpecification } from '@shared-kernel/specification/string';
import {
  IValidable,
  ValidationError,
  ValidationErrorFactory,
  ValidationErrorDataType,
} from '@shared-kernel/validation';

export class PasswordDataTypeSpecification
  extends CompositeSpecification<Password>
  implements IValidable
{
  private stringSpecification = new StringSpecification();

  public isSatisfiedBy(candidate: Password): boolean {
    return this.stringSpecification.isSatisfiedBy(candidate.value);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createType(ValidationErrorDataType.STRING);
  }
}
