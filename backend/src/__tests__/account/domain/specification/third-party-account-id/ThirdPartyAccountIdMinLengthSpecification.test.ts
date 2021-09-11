import { ThirdPartyAccountId } from '@account/domain';
import { ThirdPartyAccountIdMinLengthSpecification } from '@account/domain/specification/third-party-account-id';
import { ValidationErrorType, ValidationError } from '@shared-kernel/validation';

let thirdPartyAccountIdMinLengthSpecification: ThirdPartyAccountIdMinLengthSpecification;

beforeEach(() => {
  thirdPartyAccountIdMinLengthSpecification = new ThirdPartyAccountIdMinLengthSpecification();
});

describe('ThirdPartyAccountIdMinLengthSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when third party account id has 1 character or more', () => {
      const thirdPartyAccountId1 = new ThirdPartyAccountId('A'.repeat(1));
      const thirdPartyAccountId2 = new ThirdPartyAccountId('A'.repeat(11));

      expect(thirdPartyAccountIdMinLengthSpecification.isSatisfiedBy(thirdPartyAccountId1)).toBe(
        true
      );
      expect(thirdPartyAccountIdMinLengthSpecification.isSatisfiedBy(thirdPartyAccountId2)).toBe(
        true
      );
    });

    it('returns false when third party account id has 0', () => {
      const thirdPartyAccountId1 = new ThirdPartyAccountId('');

      expect(thirdPartyAccountIdMinLengthSpecification.isSatisfiedBy(thirdPartyAccountId1)).toBe(
        false
      );
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = thirdPartyAccountIdMinLengthSpecification.validationError();
    });

    it('should have too short type', () => {
      expect(validationError.type).toBe(ValidationErrorType.TOO_SHORT);
    });

    it('should have 1 detail', () => {
      expect(Object.keys(validationError.details.details).length).toBe(1);
    });

    it('should have min detail equal 1', () => {
      expect(validationError.details.details.min).toBe(1);
    });
  });
});
