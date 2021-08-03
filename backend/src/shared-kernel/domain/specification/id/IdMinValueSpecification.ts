import { Id } from '@shared-kernel/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MinValueSpecification } from '@shared-kernel/specification/number';
import { ValidationError, IValidable, ValidationErrorFactory } from '@shared-kernel/validation/';

export class IdMinValueSpecification extends CompositeSpecification<Id> implements IValidable {
  private readonly MIN_VALUE = 1;

  private minValueSpecification = new MinValueSpecification(this.MIN_VALUE);

  public isSatisfiedBy(candidate: Id): boolean {
    return this.minValueSpecification.isSatisfiedBy(candidate.value);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createTooSmall(this.MIN_VALUE);
  }
}
