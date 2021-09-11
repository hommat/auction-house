import { OAuthAuthorizationCode } from '@security/domain';

export const mockOAuthAuthorizationCode1 = (): OAuthAuthorizationCode =>
  new OAuthAuthorizationCode('auth-code');
