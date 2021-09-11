import { ThirdPartyAccountId } from '@account/domain';
import { mockThirdPartyAccountId1, mockThirdPartyAccountId2 } from '@mocks/account';
import { mockValidationFailure } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';

describe('ThirdPartyAccountId', () => {
  describe('create', () => {
    it('should throw ValidationFailedException when validation fails', () => {
      mockValidationFailure(true);

      expect(() => ThirdPartyAccountId.create(mockThirdPartyAccountId1().value)).toThrow(
        ValidationFailedException
      );
    });
  });

  describe('equals', () => {
    it('should return true when values are the same', () => {
      expect(mockThirdPartyAccountId1().equals(mockThirdPartyAccountId1())).toBe(true);
    });

    it('should return false when values are not the same', () => {
      expect(mockThirdPartyAccountId1().equals(mockThirdPartyAccountId2())).toBe(false);
    });
  });
});
