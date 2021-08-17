import { Email } from '@account/domain';
import { EmailDataTypeSpecification } from '@account/domain/specification/email';
import { mockValidationSuccess } from '@mocks/utils';
import {
  ValidationError,
  ValidationErrorDataType,
  ValidationErrorType,
} from '@shared-kernel/validation';

let emailDataTypeSpecification: EmailDataTypeSpecification;

beforeAll(() => {
  mockValidationSuccess();
});

beforeEach(() => {
  emailDataTypeSpecification = new EmailDataTypeSpecification();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('EmailDataTypeSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when email is string', () => {
      const email1 = Email.create('123');

      expect(emailDataTypeSpecification.isSatisfiedBy(email1)).toBe(true);
    });

    it('returns false when email is not string', () => {
      const email1 = Email.create(123 as any);

      expect(emailDataTypeSpecification.isSatisfiedBy(email1)).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = emailDataTypeSpecification.validationError();
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
