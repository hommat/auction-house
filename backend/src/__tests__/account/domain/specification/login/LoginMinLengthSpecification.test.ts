import { Login } from '@account/domain';
import { LoginMinLengthSpecification } from '@account/domain/specification/login';
import { mockValidationSuccess } from '@mocks/utils';
import { ValidationErrorType, ValidationError } from '@shared-kernel/validation';

let loginMinLengthSpecification: LoginMinLengthSpecification;

beforeAll(() => {
  mockValidationSuccess();
});

beforeEach(() => {
  loginMinLengthSpecification = new LoginMinLengthSpecification();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('LoginMinLengthSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when login has 5 characters or more', () => {
      const login1 = Login.create('A'.repeat(5));
      const login2 = Login.create('A'.repeat(100));

      expect(loginMinLengthSpecification.isSatisfiedBy(login1)).toBe(true);
      expect(loginMinLengthSpecification.isSatisfiedBy(login2)).toBe(true);
    });

    it('returns false when login has 4 characters or less', () => {
      const login1 = Login.create('A'.repeat(4));
      const login2 = Login.create('A'.repeat(1));

      expect(loginMinLengthSpecification.isSatisfiedBy(login1)).toBe(false);
      expect(loginMinLengthSpecification.isSatisfiedBy(login2)).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = loginMinLengthSpecification.validationError();
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
