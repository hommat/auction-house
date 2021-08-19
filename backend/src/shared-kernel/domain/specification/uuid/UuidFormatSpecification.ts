import { Uuid } from '@shared-kernel/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { FormatSpecification } from '@shared-kernel/specification/string';
import { IValidable, ValidationError, ValidationErrorFactory } from '@shared-kernel/validation';

export class UuidFormatSpecification extends CompositeSpecification<Uuid> implements IValidable {
  private readonly REGEXP =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

  private formatSpecification = new FormatSpecification(this.REGEXP);

  public isSatisfiedBy(candidate: Uuid): boolean {
    return this.formatSpecification.isSatisfiedBy(candidate.value);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createFormat();
  }
}
