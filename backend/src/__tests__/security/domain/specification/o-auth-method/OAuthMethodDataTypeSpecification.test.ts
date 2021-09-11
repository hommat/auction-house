import { OAuthMethod } from '@security/domain';
import { OAuthMethodDataTypeSpecification } from '@security/domain/specification/o-auth-method';
import {
  ValidationError,
  ValidationErrorDataType,
  ValidationErrorType,
} from '@shared-kernel/validation';

let oAuthMethodDataTypeSpecification: OAuthMethodDataTypeSpecification;

beforeEach(() => {
  oAuthMethodDataTypeSpecification = new OAuthMethodDataTypeSpecification();
});

describe('OAuthMethodDataTypeSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when OAuth method is string', () => {
      const oAuthMethod1 = new OAuthMethod('123' as any);

      expect(oAuthMethodDataTypeSpecification.isSatisfiedBy(oAuthMethod1)).toBe(true);
    });

    it('returns false when OAuth method is not string', () => {
      const oAuthMethod1 = new OAuthMethod(123 as any);

      expect(oAuthMethodDataTypeSpecification.isSatisfiedBy(oAuthMethod1)).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = oAuthMethodDataTypeSpecification.validationError();
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
