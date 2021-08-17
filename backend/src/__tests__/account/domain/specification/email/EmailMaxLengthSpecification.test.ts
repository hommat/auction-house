import { Email } from '@account/domain';
import { EmailMaxLengthSpecification } from '@account/domain/specification/email';
import { mockValidationSuccess } from '@mocks/utils';
import { ValidationError, ValidationErrorType } from '@shared-kernel/validation';

let emailMaxLengthSpecification: EmailMaxLengthSpecification;

beforeAll(() => {
  mockValidationSuccess();
});

beforeEach(() => {
  emailMaxLengthSpecification = new EmailMaxLengthSpecification();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('EmailMaxLengthSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when email has 60 characters or less', () => {
      const email1 = Email.create('A'.repeat(60));
      const email2 = Email.create('A'.repeat(1));

      expect(emailMaxLengthSpecification.isSatisfiedBy(email1)).toBe(true);
      expect(emailMaxLengthSpecification.isSatisfiedBy(email2)).toBe(true);
    });

    it('returns false when login has 61 characters or more', () => {
      const email1 = Email.create('A'.repeat(61));
      const email2 = Email.create('A'.repeat(62));
      const email3 = Email.create('A'.repeat(600));

      expect(emailMaxLengthSpecification.isSatisfiedBy(email1)).toBe(false);
      expect(emailMaxLengthSpecification.isSatisfiedBy(email2)).toBe(false);
      expect(emailMaxLengthSpecification.isSatisfiedBy(email3)).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = emailMaxLengthSpecification.validationError();
    });

    it('should have too long type', () => {
      expect(validationError.type).toBe(ValidationErrorType.TOO_LONG);
    });

    it('should have 1 detail', () => {
      expect(Object.keys(validationError.details.details).length).toBe(1);
    });

    it('should have max detail equal 60', () => {
      expect(validationError.details.details.max).toBe(60);
    });
  });
});
