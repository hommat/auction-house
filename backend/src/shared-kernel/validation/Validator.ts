import { ICompositeSpecification } from '@shared-kernel/specification';
import { ValidationFailedException } from '@shared-kernel/validation';
import { ValidationErrorsRecord } from './ValidationErrorsRecord';
import { ValidationError } from './ValidationError';
import { IValidable } from './IValidable';

export class Validator<T> {
  private _validationErrors: ValidationErrorsRecord = {};

  constructor(private _validatedFieldName: string, private _candidate: T) {}

  public validate(specification: ICompositeSpecification<T> & IValidable): void {
    if (!specification.isSatisfiedBy(this._candidate)) {
      this.addValidationErrorToRecord(specification.validationError());
    }
  }

  private addValidationErrorToRecord(validationError: ValidationError): void {
    this._validationErrors[validationError.type] = validationError.details;
  }

  public throwExceptionIfValidationFailed(): void {
    if (this.hasErrors) {
      throw new ValidationFailedException(this._validatedFieldName, this._validationErrors);
    }
  }

  private get hasErrors(): boolean {
    return Object.keys(this._validationErrors).length > 0;
  }
}
