import { mockOAuthMethod1 } from '@mocks/security';
import { OAuthLinkQueryInput } from '@security/read-model/query/input';
import { OAuthLinkQuery } from '@security/read-model/query';
import { InvalidInputException } from '@shared-kernel/cqrs/exception';

describe('OAuthLinkQuery', () => {
  describe('create', () => {
    it('should throw InvalidInputException when OAuth method is not valid', () => {
      const input = new OAuthLinkQueryInput('');

      expect(() => OAuthLinkQuery.create(input)).toThrow(InvalidInputException);
    });

    it('should return OAuthLinkQuery when input is valid', () => {
      const input = new OAuthLinkQueryInput(mockOAuthMethod1().type);
      const oAuthLinkQuery = OAuthLinkQuery.create(input);

      expect(oAuthLinkQuery.oAuthMethod.equals(mockOAuthMethod1())).toBe(true);
    });
  });
});
