import { ValidationErrorDetails } from './ValidationErrorDetails';
import { ValidationErrorDetailType } from './ValidationErrorDetailType';
import { ValidationError } from './ValidationError';
import { ValidationErrorType } from './ValidationErrorType';
import { ValidationErrorDataType } from './ValidationErrorDataType';

export class ValidationErrorFactory {
  public static createType(type: ValidationErrorDataType): ValidationError {
    return new ValidationError(
      ValidationErrorType.INVALID_TYPE,
      new ValidationErrorDetails({ [ValidationErrorDetailType.TYPE]: type })
    );
  }

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

  public static createAlreadyInUse(): ValidationError {
    return new ValidationError(ValidationErrorType.ALREADY_IN_USE);
  }
}
