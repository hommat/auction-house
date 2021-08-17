import { Email } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { StringSpecification } from '@shared-kernel/specification/string';
import {
  IValidable,
  ValidationError,
  ValidationErrorFactory,
  ValidationErrorDataType,
} from '@shared-kernel/validation';

export class EmailDataTypeSpecification
  extends CompositeSpecification<Email>
  implements IValidable
{
  private stringSpecification = new StringSpecification();

  public isSatisfiedBy(candidate: Email): boolean {
    return this.stringSpecification.isSatisfiedBy(candidate.value);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createType(ValidationErrorDataType.STRING);
  }
}
