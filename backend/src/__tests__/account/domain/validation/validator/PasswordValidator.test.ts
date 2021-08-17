import {
  PasswordDataTypeSpecification,
  PasswordMaxLengthSpecification,
  PasswordMinLengthSpecification,
} from '@account/domain/specification/password';
import { ValidationField } from '@account/domain/validation';
import { PasswordValidator } from '@account/domain/validation/validator';
import { mockPassword1 } from '@mocks/account';
import { mockSpecificationOnce } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';

let passwordValidator: PasswordValidator;

beforeEach(() => {
  passwordValidator = new PasswordValidator(mockPassword1());
});

describe('PasswordValidator', () => {
  describe('validate', () => {
    it('should throw ValidationFailedException with password field name', () => {
      mockSpecificationOnce(PasswordMinLengthSpecification, false);

      try {
        passwordValidator.validate();
        expect(true).toBe(false);
      } catch (e) {
        expect(e.field).toBe(ValidationField.PASSWORD);
      }
    });

    it('should throw ValidationFailedException when PasswordDataTypeSpecification is not satisfied', () => {
      mockSpecificationOnce(PasswordDataTypeSpecification, false);

      expect(() => passwordValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should throw ValidationFailedException when PasswordMinLengthSpecification is not satisfied', () => {
      mockSpecificationOnce(PasswordMinLengthSpecification, false);

      expect(() => passwordValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should throw ValidationFailedException when PasswordMaxLengthSpecification is not satisfied', () => {
      mockSpecificationOnce(PasswordMaxLengthSpecification, false);

      expect(() => passwordValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should not throw when every specification is satisfied', () => {
      mockSpecificationOnce(PasswordDataTypeSpecification, true);
      mockSpecificationOnce(PasswordMinLengthSpecification, true);
      mockSpecificationOnce(PasswordMaxLengthSpecification, true);

      expect(() => passwordValidator.validate()).not.toThrow();
    });
  });
});
