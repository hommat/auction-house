import { ValidationField } from '@account/domain/validation/';
import { ValidationFailedException, ValidationErrorFactory } from '@shared-kernel/validation/';

export class EmailAlreadyInUseException extends ValidationFailedException {
  constructor() {
    const alreadyInUseError = ValidationErrorFactory.createAlreadyInUse();

    super(ValidationField.EMAIL, { [alreadyInUseError.type]: alreadyInUseError.details });
  }
}
