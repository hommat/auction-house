import { ValidationErrorsRecord } from './ValidationErrorsRecord';

export class ValidationFailedException extends Error {
  constructor(private _field: string, private _errors: ValidationErrorsRecord) {
    super();
  }

  public get field(): string {
    return this._field;
  }

  public get errors(): ValidationErrorsRecord {
    return { ...this._errors };
  }
}
