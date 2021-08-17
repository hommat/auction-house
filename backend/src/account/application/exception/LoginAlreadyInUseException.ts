import { ValidationField } from '@account/domain/validation/';
import { ValidationFailedException, ValidationErrorFactory } from '@shared-kernel/validation/';

export class LoginAlreadyInUseException extends ValidationFailedException {
  constructor() {
    const alreadyInUseError = ValidationErrorFactory.createAlreadyInUse();

    super(ValidationField.LOGIN, { [alreadyInUseError.type]: alreadyInUseError.details });
  }
}
