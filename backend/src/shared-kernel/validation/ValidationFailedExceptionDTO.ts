import { ValidationErrorsRecord } from './ValidationErrorsRecord';

export interface ValidationFailedExceptionDTO {
  field: string;
  errors: ValidationErrorsRecord;
}
