import {
  EmailDataTypeSpecification,
  EmailFormatSpecification,
  EmailMaxLengthSpecification,
} from '@account/domain/specification/email';
import { ValidationField } from '@account/domain/validation';
import { EmailValidator } from '@account/domain/validation/validator';
import { mockEmail1 } from '@mocks/account';
import { mockSpecificationOnce } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';

let emailValidator: EmailValidator;

beforeEach(() => {
  emailValidator = new EmailValidator(mockEmail1());
});

describe('EmailValidator', () => {
  describe('validate', () => {
    it('should throw ValidationFailedException with email field name', () => {
      mockSpecificationOnce(EmailDataTypeSpecification, false);

      try {
        emailValidator.validate();
        expect(true).toBe(false);
      } catch (e) {
        expect(e.field).toBe(ValidationField.EMAIL);
      }
    });

    it('should throw ValidationFailedException when EmailDataTypeSpecification is not satisfied', () => {
      mockSpecificationOnce(EmailDataTypeSpecification, false);

      expect(() => emailValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should throw ValidationFailedException when EmailFormatSpecification is not satisfied', () => {
      mockSpecificationOnce(EmailFormatSpecification, false);

      expect(() => emailValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should throw ValidationFailedException when EmailMaxLengthSpecification is not satisfied', () => {
      mockSpecificationOnce(EmailMaxLengthSpecification, false);

      expect(() => emailValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should not throw when every specification is satisfied', () => {
      mockSpecificationOnce(EmailDataTypeSpecification, true);
      mockSpecificationOnce(EmailFormatSpecification, true);
      mockSpecificationOnce(EmailMaxLengthSpecification, true);

      expect(() => emailValidator.validate()).not.toThrow();
    });
  });
});
