import { ValidationErrorDetails } from './ValidationErrorDetails';
import { ValidationErrorType } from './ValidationErrorType';

export class ValidationError {
  constructor(private _type: ValidationErrorType, private _details: ValidationErrorDetails) {}

  public get type(): ValidationErrorType {
    return this._type;
  }

  public get details(): ValidationErrorDetails {
    return this._details;
  }
}
