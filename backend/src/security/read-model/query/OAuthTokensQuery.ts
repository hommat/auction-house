import { OAuthAuthorizationCode, OAuthMethod, OAuthMethodType } from '@security/domain';
import { OAuthTokensQueryInput } from '@security/read-model/query/input';
import { Query } from '@shared-kernel/cqrs/query';

export class OAuthTokensQuery extends Query {
  public static create(i: OAuthTokensQueryInput): OAuthTokensQuery {
    const [oAuthMethod, oAuthMethodValidationErr] = this.createSafe(() =>
      OAuthMethod.create(i.method as OAuthMethodType)
    );

    this.throwInvalidInputExceptionIfNeeded(oAuthMethodValidationErr);

    const authorizationCode = new OAuthAuthorizationCode(i.authorizationCode);

    return new OAuthTokensQuery(authorizationCode, oAuthMethod!);
  }

  private constructor(
    private _oAuthAuthorizationCode: OAuthAuthorizationCode,
    private _oAuthMethod: OAuthMethod
  ) {
    super();
  }

  public get oAuthAuthorizationCode(): OAuthAuthorizationCode {
    return this._oAuthAuthorizationCode;
  }

  public get oAuthMethod(): OAuthMethod {
    return this._oAuthMethod;
  }
}
