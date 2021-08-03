import { ValidationErrorType } from './ValidationErrorType';
import { ValidationErrorDetails } from './ValidationErrorDetails';

export type ValidationErrorsRecord = Partial<Record<ValidationErrorType, ValidationErrorDetails>>;
