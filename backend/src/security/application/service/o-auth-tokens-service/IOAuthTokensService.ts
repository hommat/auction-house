import {
  OAuthAccessToken,
  OAuthAuthorizationCode,
  OAuthMethod,
  OAuthValueToken,
} from '@security/domain/';

export interface IOAuthTokensService {
  getTokens(
    authorizationCode: OAuthAuthorizationCode,
    method: OAuthMethod
  ): Promise<[OAuthAccessToken, OAuthValueToken]>;
}
