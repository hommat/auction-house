import {
  ThirdPartyAccountServiceDataTypeSpecification,
  ThirdPartyAccountServiceValueSpecification,
} from '@account/domain/specification/third-party-account-service';
import { ValidationField } from '@account/domain/validation';
import { ThirdPartyAccountServiceValidator } from '@account/domain/validation/validator';
import { mockThirdPartyAccountService1 } from '@mocks/account';
import { mockSpecificationOnce } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';

let thirdPartyAccountServiceValidator: ThirdPartyAccountServiceValidator;

beforeEach(() => {
  thirdPartyAccountServiceValidator = new ThirdPartyAccountServiceValidator(
    mockThirdPartyAccountService1()
  );
});

describe('ThirdPartyAccountServiceValidator', () => {
  describe('validate', () => {
    it('should throw ValidationFailedException with third party account service field name', () => {
      mockSpecificationOnce(ThirdPartyAccountServiceValidator, false);

      try {
        thirdPartyAccountServiceValidator.validate();
        expect(true).toBe(false);
      } catch (e) {
        expect(e.field).toBe(ValidationField.THIRD_PARTY_ACCOUNT_SERVICE);
      }
    });

    it('should throw ValidationFailedException when ThirdPartyAccountServiceDataTypeSpecification is not satisfied', () => {
      mockSpecificationOnce(ThirdPartyAccountServiceDataTypeSpecification, false);

      expect(() => thirdPartyAccountServiceValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should throw ValidationFailedException when ThirdPartyAccountServiceValueSpecification is not satisfied', () => {
      mockSpecificationOnce(ThirdPartyAccountServiceValueSpecification, false);

      expect(() => thirdPartyAccountServiceValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should not throw when every specification is satisfied', () => {
      mockSpecificationOnce(ThirdPartyAccountServiceDataTypeSpecification, true);
      mockSpecificationOnce(ThirdPartyAccountServiceValueSpecification, true);

      expect(() => thirdPartyAccountServiceValidator.validate()).not.toThrow();
    });
  });
});
