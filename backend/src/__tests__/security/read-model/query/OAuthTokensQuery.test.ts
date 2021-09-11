import { mockOAuthAuthorizationCode1, mockOAuthMethod1 } from '@mocks/security';
import { OAuthTokensQueryInput } from '@security/read-model/query/input';
import { OAuthTokensQuery } from '@security/read-model/query';
import { InvalidInputException } from '@shared-kernel/cqrs/exception';

describe('OAuthTokensQuery', () => {
  describe('create', () => {
    it('should throw InvalidInputException when OAuth method is not valid', () => {
      const input = new OAuthTokensQueryInput(mockOAuthAuthorizationCode1().value, '');

      expect(() => OAuthTokensQuery.create(input)).toThrow(InvalidInputException);
    });

    it('should return OAuthTokensQuery when input is valid', () => {
      const input = new OAuthTokensQueryInput(
        mockOAuthAuthorizationCode1().value,
        mockOAuthMethod1().type
      );
      const oAuthTokensQuery = OAuthTokensQuery.create(input);

      expect(oAuthTokensQuery.oAuthAuthorizationCode.equals(mockOAuthAuthorizationCode1())).toBe(
        true
      );
      expect(oAuthTokensQuery.oAuthMethod.equals(mockOAuthMethod1())).toBe(true);
    });
  });
});
