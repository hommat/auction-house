import { EmailAlreadyInUseException } from '@account/application/exception';
import { ValidationField } from '@account/domain/validation';
import { ValidationErrorType } from '@shared-kernel/validation';

let emailAlreadyInUseException: EmailAlreadyInUseException;

beforeEach(() => {
  emailAlreadyInUseException = new EmailAlreadyInUseException();
});

describe('EmailAlreadyInUseException', () => {
  it('should have email validation field', () => {
    expect(emailAlreadyInUseException.field).toBe(ValidationField.EMAIL);
  });

  it('should have already in use validation error without details', () => {
    expect(Object.keys(emailAlreadyInUseException.errors).length).toBe(1);
    expect(emailAlreadyInUseException.errors[ValidationErrorType.ALREADY_IN_USE]?.details).toEqual(
      {}
    );
  });
});
