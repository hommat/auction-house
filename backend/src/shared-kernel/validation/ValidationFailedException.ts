import { ValidationFailedExceptionDTO } from './ValidationFailedExceptionDTO';
import { ValidationErrorsRecord } from './ValidationErrorsRecord';

export class ValidationFailedException extends Error {
  constructor(private _field: string, private _errors: ValidationErrorsRecord) {
    super();
  }

  public toDTO(): ValidationFailedExceptionDTO {
    return {
      field: this._field,
      errors: { ...this._errors },
    };
  }

  public get field(): string {
    return this._field;
  }

  public get errors(): ValidationErrorsRecord {
    return { ...this._errors };
  }
}
