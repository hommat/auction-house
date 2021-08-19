import { Uuid } from '@shared-kernel/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { StringSpecification } from '@shared-kernel/specification/string';
import {
  ValidationError,
  IValidable,
  ValidationErrorFactory,
  ValidationErrorDataType,
} from '@shared-kernel/validation/';

export class UuidDataTypeSpecification extends CompositeSpecification<Uuid> implements IValidable {
  private stringSpecification = new StringSpecification();

  public isSatisfiedBy(candidate: Uuid): boolean {
    return this.stringSpecification.isSatisfiedBy(candidate.value);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createType(ValidationErrorDataType.STRING);
  }
}
