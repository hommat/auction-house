import { OAuthMethod, OAuthMethodType } from '@security/domain';
import { OAuthLinkQueryInput } from '@security/read-model/query/input';
import { Query } from '@shared-kernel/cqrs/query';

export class OAuthLinkQuery extends Query {
  public static create(i: OAuthLinkQueryInput): OAuthLinkQuery {
    const [oAuthMethod, oAuthMethodValidationErr] = this.createSafe(() =>
      OAuthMethod.create(i.method as OAuthMethodType)
    );

    this.throwInvalidInputExceptionIfNeeded(oAuthMethodValidationErr);

    return new OAuthLinkQuery(oAuthMethod!);
  }

  private constructor(private _oAuthMethod: OAuthMethod) {
    super();
  }

  public get oAuthMethod(): OAuthMethod {
    return this._oAuthMethod;
  }
}
