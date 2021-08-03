import { Password } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MaxLengthSpecification } from '@shared-kernel/specification/string';
import { ValidationError, ValidationErrorFactory, IValidable } from '@shared-kernel/validation';

export class PasswordMaxLengthSpecification
  extends CompositeSpecification<Password>
  implements IValidable
{
  private readonly MAX_LENGTH = 10;

  private maxLengthSpecification = new MaxLengthSpecification(this.MAX_LENGTH);

  public isSatisfiedBy(candidate: Password): boolean {
    return this.maxLengthSpecification.isSatisfiedBy(candidate.value);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createTooLong(this.MAX_LENGTH);
  }
}
