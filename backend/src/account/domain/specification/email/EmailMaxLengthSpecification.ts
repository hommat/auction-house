import { Email } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MaxLengthSpecification } from '@shared-kernel/specification/string';
import { IValidable, ValidationError, ValidationErrorFactory } from '@shared-kernel/validation';

export class EmailMaxLengthSpecification
  extends CompositeSpecification<Email>
  implements IValidable
{
  private readonly MAX_LENGTH = 60;

  private maxLengthSpecification = new MaxLengthSpecification(this.MAX_LENGTH);

  public isSatisfiedBy(candidate: Email): boolean {
    return this.maxLengthSpecification.isSatisfiedBy(candidate.value);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createTooLong(this.MAX_LENGTH);
  }
}
