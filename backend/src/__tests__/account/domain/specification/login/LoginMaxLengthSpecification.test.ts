import { Login } from '@account/domain';
import { LoginMaxLengthSpecification } from '@account/domain/specification/login';
import { mockValidationSuccess } from '@mocks/utils';
import { ValidationError, ValidationErrorType } from '@shared-kernel/validation';

let loginMaxLengthSpecification: LoginMaxLengthSpecification;

beforeAll(() => {
  mockValidationSuccess();
});

beforeEach(() => {
  loginMaxLengthSpecification = new LoginMaxLengthSpecification();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('LoginMaxLengthSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when login has 10 characters or less', () => {
      const login1 = Login.create('A'.repeat(10));
      const login2 = Login.create('A'.repeat(1));

      expect(loginMaxLengthSpecification.isSatisfiedBy(login1)).toBe(true);
      expect(loginMaxLengthSpecification.isSatisfiedBy(login2)).toBe(true);
    });

    it('returns false when login has 11 characters or more', () => {
      const login1 = Login.create('A'.repeat(11));
      const login2 = Login.create('A'.repeat(12));
      const login3 = Login.create('A'.repeat(123));

      expect(loginMaxLengthSpecification.isSatisfiedBy(login1)).toBe(false);
      expect(loginMaxLengthSpecification.isSatisfiedBy(login2)).toBe(false);
      expect(loginMaxLengthSpecification.isSatisfiedBy(login3)).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = loginMaxLengthSpecification.validationError();
    });

    it('should have too long type', () => {
      expect(validationError.type).toBe(ValidationErrorType.TOO_LONG);
    });

    it('should have 1 detail', () => {
      expect(Object.keys(validationError.details.details).length).toBe(1);
    });

    it('should have max detail equal 10', () => {
      expect(validationError.details.details.max).toBe(10);
    });
  });
});
