import { Jwt } from '@security/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { FormatSpecification } from '@shared-kernel/specification/string';
import { IValidable, ValidationError, ValidationErrorFactory } from '@shared-kernel/validation';

export class JwtFormatSpecification extends CompositeSpecification<Jwt> implements IValidable {
  private readonly REGEXP = /(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)/;

  private _formatSpecification = new FormatSpecification(this.REGEXP);

  public isSatisfiedBy(candidate: Jwt): boolean {
    return this._formatSpecification.isSatisfiedBy(candidate.value);
  }

  public validationError(): ValidationError {
    return ValidationErrorFactory.createFormat();
  }
}
