import { Email } from '@account/domain';
import {
  EmailDataTypeSpecification,
  EmailFormatSpecification,
  EmailMaxLengthSpecification,
} from '@account/domain/specification/email';
import { ValidationField } from '@account/domain/validation';
import { ValueObjectValidator, Validator } from '@shared-kernel/validation';

export class EmailValidator extends ValueObjectValidator<Email> {
  protected _validator = new Validator(ValidationField.EMAIL, this._email);
  protected _specifications = [
    new EmailDataTypeSpecification(),
    new EmailFormatSpecification(),
    new EmailMaxLengthSpecification(),
  ];

  constructor(private _email: Email) {
    super();
  }
}
