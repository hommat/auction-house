import { OAuthMethod } from '@security/domain';
import { mockOAuthMethod1 } from '@mocks/security';
import { mockValidationFailure } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';

describe('OAuthMethod', () => {
  describe('create', () => {
    it('should throw ValidationFailedException when validation fails', () => {
      mockValidationFailure(true);

      expect(() => OAuthMethod.create(mockOAuthMethod1().type)).toThrow(ValidationFailedException);
    });
  });
});
