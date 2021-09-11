import { ThirdPartyAccountService } from '@account/domain';
import { ThirdPartyAccountServiceDataTypeSpecification } from '@account/domain/specification/third-party-account-service';
import {
  ValidationError,
  ValidationErrorDataType,
  ValidationErrorType,
} from '@shared-kernel/validation';

let thirdPartyAccountServiceDataTypeSpecification: ThirdPartyAccountServiceDataTypeSpecification;

beforeEach(() => {
  thirdPartyAccountServiceDataTypeSpecification =
    new ThirdPartyAccountServiceDataTypeSpecification();
});

describe('ThirdPartyAccountServiceDataTypeSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when third party account service type is string', () => {
      const thirdPartyAccountService1 = new ThirdPartyAccountService('123' as any);

      expect(
        thirdPartyAccountServiceDataTypeSpecification.isSatisfiedBy(thirdPartyAccountService1)
      ).toBe(true);
    });

    it('returns false when third party account service type is not string', () => {
      const thirdPartyAccountService1 = new ThirdPartyAccountService(123 as any);

      expect(
        thirdPartyAccountServiceDataTypeSpecification.isSatisfiedBy(thirdPartyAccountService1)
      ).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = thirdPartyAccountServiceDataTypeSpecification.validationError();
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
