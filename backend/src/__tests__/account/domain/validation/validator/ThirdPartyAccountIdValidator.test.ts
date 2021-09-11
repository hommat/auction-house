import {
  ThirdPartyAccountIdDataTypeSpecification,
  ThirdPartyAccountIdMinLengthSpecification,
} from '@account/domain/specification/third-party-account-id';
import { ValidationField } from '@account/domain/validation';
import { ThirdPartyAccountIdValidator } from '@account/domain/validation/validator';
import { mockThirdPartyAccountId1 } from '@mocks/account';
import { mockSpecificationOnce } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';

let thirdPartyAccountIdValidator: ThirdPartyAccountIdValidator;

beforeEach(() => {
  thirdPartyAccountIdValidator = new ThirdPartyAccountIdValidator(mockThirdPartyAccountId1());
});

describe('ThirdPartyAccountIdValidator', () => {
  describe('validate', () => {
    it('should throw ValidationFailedException with third party account id field name', () => {
      mockSpecificationOnce(ThirdPartyAccountIdValidator, false);

      try {
        thirdPartyAccountIdValidator.validate();
        expect(true).toBe(false);
      } catch (e) {
        expect(e.field).toBe(ValidationField.THIRD_PARTY_ACCOUNT_ID);
      }
    });

    it('should throw ValidationFailedException when ThirdPartyAccountIdDataTypeSpecification is not satisfied', () => {
      mockSpecificationOnce(ThirdPartyAccountIdDataTypeSpecification, false);

      expect(() => thirdPartyAccountIdValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should throw ValidationFailedException when ThirdPartyAccountIdMinLengthSpecification is not satisfied', () => {
      mockSpecificationOnce(ThirdPartyAccountIdMinLengthSpecification, false);

      expect(() => thirdPartyAccountIdValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should not throw when every specification is satisfied', () => {
      mockSpecificationOnce(ThirdPartyAccountIdDataTypeSpecification, true);
      mockSpecificationOnce(ThirdPartyAccountIdMinLengthSpecification, true);

      expect(() => thirdPartyAccountIdValidator.validate()).not.toThrow();
    });
  });
});
