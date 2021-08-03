import { Login } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MaxLengthSpecification } from '@shared-kernel/specification/string';
import { IValidable, ValidationError, ValidationErrorFactory } from '@shared-kernel/validation';

export class LoginMaxLengthSpecification
  extends CompositeSpecification<Login>
  implements IValidable
{
  private readonly MAX_LENGTH = 10;

  private maxLengthSpecification = new MaxLengthSpecification(this.MAX_LENGTH);

  public isSatisfiedBy(candidate: Login): boolean {
    return this.maxLengthSpecification.isSatisfiedBy(candidate.value);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createTooLong(this.MAX_LENGTH);
  }
}
