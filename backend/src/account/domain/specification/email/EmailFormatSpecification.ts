import { Email } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { FormatSpecification } from '@shared-kernel/specification/string';
import { IValidable, ValidationError, ValidationErrorFactory } from '@shared-kernel/validation';

export class EmailFormatSpecification extends CompositeSpecification<Email> implements IValidable {
  private readonly REGEXP = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

  private formatSpecification = new FormatSpecification(this.REGEXP);

  public isSatisfiedBy(candidate: Email): boolean {
    return this.formatSpecification.isSatisfiedBy(candidate.value);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createFormat();
  }
}
