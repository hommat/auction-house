import { ValidationDetailValue } from './ValidationDetailValue';
import { ValidationErrorDetailType } from './ValidationErrorDetailType';

export class ValidationErrorDetail {
  constructor(private _type: ValidationErrorDetailType, private _value: ValidationDetailValue) {}

  public get type(): ValidationErrorDetailType {
    return this._type;
  }

  public get value(): ValidationDetailValue {
    return this._value;
  }
}
