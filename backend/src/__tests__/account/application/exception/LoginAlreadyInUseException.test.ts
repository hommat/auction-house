import { LoginAlreadyInUseException } from '@account/application/exception';
import { ValidationField } from '@account/domain/validation';
import { ValidationErrorType } from '@shared-kernel/validation';

let loginAlreadyInUseException: LoginAlreadyInUseException;

beforeEach(() => {
  loginAlreadyInUseException = new LoginAlreadyInUseException();
});

describe('LoginAlreadyInUseException', () => {
  it('should have login validation field', () => {
    expect(loginAlreadyInUseException.field).toBe(ValidationField.LOGIN);
  });

  it('should have already in use validation error without details', () => {
    expect(Object.keys(loginAlreadyInUseException.errors).length).toBe(1);
    expect(loginAlreadyInUseException.errors[ValidationErrorType.ALREADY_IN_USE]?.details).toEqual(
      {}
    );
  });
});
