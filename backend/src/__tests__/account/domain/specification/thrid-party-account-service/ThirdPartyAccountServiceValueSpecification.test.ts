import { ThirdPartyAccountService, ThirdPartyAccountServiceType } from '@account/domain';
import { ThirdPartyAccountServiceValueSpecification } from '@account/domain/specification/third-party-account-service';
import { ValidationErrorType, ValidationError } from '@shared-kernel/validation';

let thirdPartyAccountServiceValueSpecification: ThirdPartyAccountServiceValueSpecification;

beforeEach(() => {
  thirdPartyAccountServiceValueSpecification = new ThirdPartyAccountServiceValueSpecification();
});

describe('ThirdPartyAccountServiceValueSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when third party account service has google type', () => {
      const thirdPartyAccountService1 = new ThirdPartyAccountService(
        ThirdPartyAccountServiceType.GOOGLE
      );

      expect(
        thirdPartyAccountServiceValueSpecification.isSatisfiedBy(thirdPartyAccountService1)
      ).toBe(true);
    });

    it('returns false when third party account service has wrong type', () => {
      const thirdPartyAccountService1 = new ThirdPartyAccountService('invalid-type' as any);

      expect(
        thirdPartyAccountServiceValueSpecification.isSatisfiedBy(thirdPartyAccountService1)
      ).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = thirdPartyAccountServiceValueSpecification.validationError();
    });

    it('should have invalid value type', () => {
      expect(validationError.type).toBe(ValidationErrorType.INVALID_VALUE);
    });

    it('should have 1 detail', () => {
      expect(Object.keys(validationError.details.details).length).toBe(1);
    });

    it('should have values type equals google', () => {
      expect(validationError.details.details.values).toEqual([ThirdPartyAccountServiceType.GOOGLE]);
    });
  });
});
