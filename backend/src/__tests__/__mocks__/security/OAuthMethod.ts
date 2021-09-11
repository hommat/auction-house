import { OAuthMethod, OAuthMethodType } from '@security/domain';

export const mockOAuthMethod1 = (): OAuthMethod => new OAuthMethod(OAuthMethodType.GOOGLE);
