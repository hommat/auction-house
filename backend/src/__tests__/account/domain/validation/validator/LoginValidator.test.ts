import {
  LoginDataTypeSpecification,
  LoginMinLengthSpecification,
  LoginMaxLengthSpecification,
} from '@account/domain/specification/login';
import { ValidationField } from '@account/domain/validation';
import { LoginValidator } from '@account/domain/validation/validator';
import { mockLogin1 } from '@mocks/account';
import { mockSpecificationOnce } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';

let loginValidator: LoginValidator;

beforeEach(() => {
  loginValidator = new LoginValidator(mockLogin1());
});

describe('LoginValidator', () => {
  describe('validate', () => {
    it('should throw ValidationFailedException with login field name', () => {
      mockSpecificationOnce(LoginMinLengthSpecification, false);

      try {
        loginValidator.validate();
        expect(true).toBe(false);
      } catch (e) {
        expect(e.field).toBe(ValidationField.LOGIN);
      }
    });

    it('should throw ValidationFailedException when LoginDataTypeSpecification is not satisfied', () => {
      mockSpecificationOnce(LoginDataTypeSpecification, false);

      expect(() => loginValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should throw ValidationFailedException when LoginMinLengthSpecification is not satisfied', () => {
      mockSpecificationOnce(LoginMinLengthSpecification, false);

      expect(() => loginValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should throw ValidationFailedException when LoginMaxLengthSpecification is not satisfied', () => {
      mockSpecificationOnce(LoginMaxLengthSpecification, false);

      expect(() => loginValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should not throw when every specification is satisfied', () => {
      mockSpecificationOnce(LoginDataTypeSpecification, true);
      mockSpecificationOnce(LoginMinLengthSpecification, true);
      mockSpecificationOnce(LoginMaxLengthSpecification, true);

      expect(() => loginValidator.validate()).not.toThrow();
    });
  });
});
