import { Id } from '@shared-kernel/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { IntegerSpecification } from '@shared-kernel/specification/number';
import {
  ValidationError,
  IValidable,
  ValidationErrorFactory,
  ValidationErrorDataType,
} from '@shared-kernel/validation/';

export class IdDataTypeSpecification extends CompositeSpecification<Id> implements IValidable {
  private integerSpecification = new IntegerSpecification();

  public isSatisfiedBy(candidate: Id): boolean {
    return this.integerSpecification.isSatisfiedBy(candidate.value);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createType(ValidationErrorDataType.INTEGER);
  }
}
