import { ThirdPartyAccountId } from '@account/domain';
import { ThirdPartyAccountIdDataTypeSpecification } from '@account/domain/specification/third-party-account-id';
import {
  ValidationError,
  ValidationErrorDataType,
  ValidationErrorType,
} from '@shared-kernel/validation';

let thirdPartyAccountIdDataTypeSpecification: ThirdPartyAccountIdDataTypeSpecification;

beforeEach(() => {
  thirdPartyAccountIdDataTypeSpecification = new ThirdPartyAccountIdDataTypeSpecification();
});

describe('ThirdPartyAccountIdDataTypeSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when third party account id is string', () => {
      const thirdPartyAccountId1 = new ThirdPartyAccountId('123');

      expect(thirdPartyAccountIdDataTypeSpecification.isSatisfiedBy(thirdPartyAccountId1)).toBe(
        true
      );
    });

    it('returns false when third party account id is not string', () => {
      const thirdPartyAccountId1 = new ThirdPartyAccountId(123 as any);

      expect(thirdPartyAccountIdDataTypeSpecification.isSatisfiedBy(thirdPartyAccountId1)).toBe(
        false
      );
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = thirdPartyAccountIdDataTypeSpecification.validationError();
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
