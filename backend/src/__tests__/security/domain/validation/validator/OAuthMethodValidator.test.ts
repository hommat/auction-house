import {
  OAuthMethodDataTypeSpecification,
  OAuthMethodValueSpecification,
} from '@security/domain/specification/o-auth-method';
import { ValidationField } from '@security/domain/validation';
import { OAuthMethodValidator } from '@security/domain/validation/validator';
import { mockOAuthMethod1 } from '@mocks/security';
import { mockSpecificationOnce } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';

let oAuthMethodValidator: OAuthMethodValidator;

beforeEach(() => {
  oAuthMethodValidator = new OAuthMethodValidator(mockOAuthMethod1());
});

describe('OAuthMethodValidator', () => {
  describe('validate', () => {
    it('should throw ValidationFailedException with OAuth methid field name', () => {
      mockSpecificationOnce(OAuthMethodValidator, false);

      try {
        oAuthMethodValidator.validate();
        expect(true).toBe(false);
      } catch (e) {
        expect(e.field).toBe(ValidationField.O_AUTH_METHOD);
      }
    });

    it('should throw ValidationFailedException when OAuthMethodDataTypeSpecification is not satisfied', () => {
      mockSpecificationOnce(OAuthMethodDataTypeSpecification, false);

      expect(() => oAuthMethodValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should throw ValidationFailedException when OAuthMethodValueSpecification is not satisfied', () => {
      mockSpecificationOnce(OAuthMethodValueSpecification, false);

      expect(() => oAuthMethodValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should not throw when every specification is satisfied', () => {
      mockSpecificationOnce(OAuthMethodDataTypeSpecification, true);
      mockSpecificationOnce(OAuthMethodValueSpecification, true);

      expect(() => oAuthMethodValidator.validate()).not.toThrow();
    });
  });
});
