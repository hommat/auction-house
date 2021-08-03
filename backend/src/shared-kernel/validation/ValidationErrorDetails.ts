import { ValidationDetailValue } from './ValidationDetailValue';
import { ValidationErrorDetail } from './ValidationErrorDetail';
import { ValidationErrorDetailType } from './ValidationErrorDetailType';

type DetailsRecord = Record<ValidationErrorDetailType, ValidationDetailValue>;

export class ValidationErrorDetails {
  private _details: Partial<DetailsRecord> = {};

  constructor(details: Partial<DetailsRecord> = {}) {
    this._details = { ...details };
  }

  public add(validationErrorDetail: ValidationErrorDetail): ValidationErrorDetails {
    return new ValidationErrorDetails({
      ...this._details,
      [validationErrorDetail.type]: validationErrorDetail.value,
    });
  }

  public get details(): Partial<DetailsRecord> {
    return { ...this._details };
  }
}
