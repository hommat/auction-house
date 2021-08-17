import { Login } from '@account/domain';
import { LoginDataTypeSpecification } from '@account/domain/specification/login';
import { mockValidationSuccess } from '@mocks/utils';
import {
  ValidationError,
  ValidationErrorDataType,
  ValidationErrorType,
} from '@shared-kernel/validation';

let loginDataTypeSpecification: LoginDataTypeSpecification;

beforeAll(() => {
  mockValidationSuccess();
});

beforeEach(() => {
  loginDataTypeSpecification = new LoginDataTypeSpecification();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('LoginDataTypeSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when login is string', () => {
      const login1 = Login.create('123');

      expect(loginDataTypeSpecification.isSatisfiedBy(login1)).toBe(true);
    });

    it('returns false when login is not string', () => {
      const login1 = Login.create(123 as any);

      expect(loginDataTypeSpecification.isSatisfiedBy(login1)).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = loginDataTypeSpecification.validationError();
    });

    it('should have invalid type type', () => {
      expect(validationError.type).toBe(ValidationErrorType.INVALID_TYPE);
    });

    it('should have 1 detail', () => {
      expect(Object.keys(validationError.details.details).length).toBe(1);
    });

    it('should have type detail equal string', () => {
      expect(validationError.details.details.type).toBe(ValidationErrorDataType.STRING);
    });
  });
});
