import {
  PasswordMaxLengthSpecification,
  PasswordMinLengthSpecification,
} from '@account/domain/specification/password';
import { PasswordValidator } from '@account/domain/validation';
import { mockPassword1 } from '@mocks/account';
import { mockSpecificationOnce } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';

let passwordValidator: PasswordValidator;

beforeEach(() => {
  passwordValidator = new PasswordValidator(mockPassword1());
});

describe('PasswordValidator', () => {
  describe('validate', () => {
    it('should throw ValidationFailedException when PasswordMinLengthSpecification is not satisfied', () => {
      mockSpecificationOnce(PasswordMinLengthSpecification, false);

      expect(() => passwordValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should throw ValidationFailedException when PasswordMaxLengthSpecification is not satisfied', () => {
      mockSpecificationOnce(PasswordMaxLengthSpecification, false);

      expect(() => passwordValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should not throw when every specification is satisfied', () => {
      mockSpecificationOnce(PasswordMinLengthSpecification, true);
      mockSpecificationOnce(PasswordMaxLengthSpecification, true);

      expect(() => passwordValidator.validate()).not.toThrow();
    });
  });
});
