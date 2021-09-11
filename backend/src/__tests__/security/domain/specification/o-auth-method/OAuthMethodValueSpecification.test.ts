import { OAuthMethod, OAuthMethodType } from '@security/domain';
import { OAuthMethodValueSpecification } from '@security/domain/specification/o-auth-method';
import { ValidationErrorType, ValidationError } from '@shared-kernel/validation';

let oAuthMethodValueSpecification: OAuthMethodValueSpecification;

beforeEach(() => {
  oAuthMethodValueSpecification = new OAuthMethodValueSpecification();
});

describe('OAuthMethodValueSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when OAuth method has google type', () => {
      const thirdPartyAccountService1 = new OAuthMethod(OAuthMethodType.GOOGLE);

      expect(oAuthMethodValueSpecification.isSatisfiedBy(thirdPartyAccountService1)).toBe(true);
    });

    it('returns false when OAuth method has wrong type', () => {
      const thirdPartyAccountService1 = new OAuthMethod('invalid-type' as any);

      expect(oAuthMethodValueSpecification.isSatisfiedBy(thirdPartyAccountService1)).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = oAuthMethodValueSpecification.validationError();
    });

    it('should have invalid value type', () => {
      expect(validationError.type).toBe(ValidationErrorType.INVALID_VALUE);
    });

    it('should have 1 detail', () => {
      expect(Object.keys(validationError.details.details).length).toBe(1);
    });

    it('should have values type equals to google', () => {
      expect(validationError.details.details.values).toEqual([OAuthMethodType.GOOGLE]);
    });
  });
});
