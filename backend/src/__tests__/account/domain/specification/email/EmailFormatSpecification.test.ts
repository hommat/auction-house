import { Email } from '@account/domain';
import { EmailFormatSpecification } from '@account/domain/specification/email';
import { mockValidationSuccess } from '@mocks/utils';
import { ValidationError, ValidationErrorType } from '@shared-kernel/validation';

let emailFormatSpecification: EmailFormatSpecification;

beforeAll(() => {
  mockValidationSuccess();
});

beforeEach(() => {
  emailFormatSpecification = new EmailFormatSpecification();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('EmailFormatSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when email has proper format', () => {
      const email1 = Email.create('valid@domain.com');

      expect(emailFormatSpecification.isSatisfiedBy(email1)).toBe(true);
    });

    it('returns false when email has not proper format', () => {
      const email1 = Email.create('');
      const email2 = Email.create('invalid');
      const email3 = Email.create('invalid@');
      const email4 = Email.create('@');
      const email5 = Email.create('@domain');
      const email6 = Email.create('@domain.com');
      const email7 = Email.create('invalid@domain');
      const email8 = Email.create('invalid@domain.');

      expect(emailFormatSpecification.isSatisfiedBy(email1)).toBe(false);
      expect(emailFormatSpecification.isSatisfiedBy(email2)).toBe(false);
      expect(emailFormatSpecification.isSatisfiedBy(email3)).toBe(false);
      expect(emailFormatSpecification.isSatisfiedBy(email4)).toBe(false);
      expect(emailFormatSpecification.isSatisfiedBy(email5)).toBe(false);
      expect(emailFormatSpecification.isSatisfiedBy(email6)).toBe(false);
      expect(emailFormatSpecification.isSatisfiedBy(email7)).toBe(false);
      expect(emailFormatSpecification.isSatisfiedBy(email8)).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = emailFormatSpecification.validationError();
    });

    it('should have invalid format type', () => {
      expect(validationError.type).toBe(ValidationErrorType.INVALID_FORMAT);
    });

    it('should not have details', () => {
      expect(Object.keys(validationError.details.details).length).toBe(0);
    });
  });
});
