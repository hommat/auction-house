import { ValidationErrorDetails } from './ValidationErrorDetails';
import { ValidationErrorDetailType } from './ValidationErrorDetailType';
import { ValidationError } from './ValidationError';
import { ValidationErrorType } from './ValidationErrorType';

export class ValidationErrorFactory {
  public static createTooSmall(minValue: number): ValidationError {
    return new ValidationError(
      ValidationErrorType.TOO_SMALL,
      new ValidationErrorDetails({ [ValidationErrorDetailType.MIN]: minValue })
    );
  }

  public static createTooBig(maxValue: number): ValidationError {
    return new ValidationError(
      ValidationErrorType.TOO_BIG,
      new ValidationErrorDetails({ [ValidationErrorDetailType.MAX]: maxValue })
    );
  }

  public static createTooShort(minLength: number): ValidationError {
    return new ValidationError(
      ValidationErrorType.TOO_SHORT,
      new ValidationErrorDetails({ [ValidationErrorDetailType.MIN]: minLength })
    );
  }

  public static createTooLong(maxLength: number): ValidationError {
    return new ValidationError(
      ValidationErrorType.TOO_LONG,
      new ValidationErrorDetails({ [ValidationErrorDetailType.MAX]: maxLength })
    );
  }
}
