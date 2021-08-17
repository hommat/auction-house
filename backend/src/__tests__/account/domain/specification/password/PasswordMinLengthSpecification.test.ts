import { Password } from '@account/domain';
import { PasswordMinLengthSpecification } from '@account/domain/specification/password';
import { mockValidationSuccess } from '@mocks/utils';
import { ValidationErrorType, ValidationError } from '@shared-kernel/validation';

let passwordMinLengthSpecification: PasswordMinLengthSpecification;

beforeAll(() => {
  mockValidationSuccess();
});

beforeEach(() => {
  passwordMinLengthSpecification = new PasswordMinLengthSpecification();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('PasswordMinLengthSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when password has 5 characters or more', () => {
      const password1 = Password.create('A'.repeat(5));
      const password2 = Password.create('A'.repeat(100));

      expect(passwordMinLengthSpecification.isSatisfiedBy(password1)).toBe(true);
      expect(passwordMinLengthSpecification.isSatisfiedBy(password2)).toBe(true);
    });

    it('returns false when password has 4 characters or less', () => {
      const password1 = Password.create('A'.repeat(4));
      const password2 = Password.create('A'.repeat(1));

      expect(passwordMinLengthSpecification.isSatisfiedBy(password1)).toBe(false);
      expect(passwordMinLengthSpecification.isSatisfiedBy(password2)).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = passwordMinLengthSpecification.validationError();
    });

    it('should have too short type', () => {
      expect(validationError.type).toBe(ValidationErrorType.TOO_SHORT);
    });

    it('should have 1 detail', () => {
      expect(Object.keys(validationError.details.details).length).toBe(1);
    });

    it('should have min detail equal 5', () => {
      expect(validationError.details.details.min).toBe(5);
    });
  });
});
