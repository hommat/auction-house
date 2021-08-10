import { Password } from '@account/domain';
import { PasswordMaxLengthSpecification } from '@account/domain/specification/password';
import { ValidationError, ValidationErrorType, Validator } from '@shared-kernel/validation';

let passwordMaxLengthSpecification: PasswordMaxLengthSpecification;

beforeAll(() => {
  jest.spyOn(Validator.prototype, 'validate').mockImplementation(jest.fn());
});

beforeEach(() => {
  passwordMaxLengthSpecification = new PasswordMaxLengthSpecification();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('PasswordMaxLengthSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when password has 10 characters or less', () => {
      const password1 = Password.create('A'.repeat(10));
      const password2 = Password.create('A'.repeat(1));

      expect(passwordMaxLengthSpecification.isSatisfiedBy(password1)).toBe(true);
      expect(passwordMaxLengthSpecification.isSatisfiedBy(password2)).toBe(true);
    });

    it('returns false when password has 11 characters or more', () => {
      const password1 = Password.create('A'.repeat(11));
      const password2 = Password.create('A'.repeat(12));
      const password3 = Password.create('A'.repeat(123));

      expect(passwordMaxLengthSpecification.isSatisfiedBy(password1)).toBe(false);
      expect(passwordMaxLengthSpecification.isSatisfiedBy(password2)).toBe(false);
      expect(passwordMaxLengthSpecification.isSatisfiedBy(password3)).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = passwordMaxLengthSpecification.validationError();
    });

    it('should has too long type', () => {
      expect(validationError.type).toBe(ValidationErrorType.TOO_LONG);
    });

    it('should has 1 detail', () => {
      expect(Object.keys(validationError.details.details).length).toBe(1);
    });

    it('should has max detail equal 10', () => {
      expect(validationError.details.details.max).toBe(10);
    });
  });
});
