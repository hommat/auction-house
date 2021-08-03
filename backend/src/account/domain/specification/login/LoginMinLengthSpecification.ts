import { Login } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MinLengthSpecification } from '@shared-kernel/specification/string';
import { IValidable, ValidationError, ValidationErrorFactory } from '@shared-kernel/validation';

export class LoginMinLengthSpecification
  extends CompositeSpecification<Login>
  implements IValidable
{
  private readonly MIN_LENGTH = 5;

  private minLengthSpecification = new MinLengthSpecification(this.MIN_LENGTH);

  public isSatisfiedBy(candidate: Login): boolean {
    return this.minLengthSpecification.isSatisfiedBy(candidate.value);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createTooShort(this.MIN_LENGTH);
  }
}
