import { ThirdPartyAccountService } from '@account/domain';
import { mockThirdPartyAccountService1 } from '@mocks/account';
import { mockValidationFailure } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';

describe('ThirdPartyAccountService', () => {
  describe('create', () => {
    it('should throw ValidationFailedException when validation fails', () => {
      mockValidationFailure(true);

      expect(() => ThirdPartyAccountService.create(mockThirdPartyAccountService1().type)).toThrow(
        ValidationFailedException
      );
    });
  });
});
