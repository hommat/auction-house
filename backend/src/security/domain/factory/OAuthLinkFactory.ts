import { OAuthLink, OAuthMethod, OAuthMethodType } from '@security/domain';
import { Url } from '@shared-kernel/domain';

export class OAuthLinkFactory {
  public static create(method: OAuthMethod): OAuthLink {
    switch (method.type) {
      case OAuthMethodType.GOOGLE:
        return OAuthLinkFactory.createGoogle();
    }
  }

  private static createGoogle(): OAuthLink {}
}
