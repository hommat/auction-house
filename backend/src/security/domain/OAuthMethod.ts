import { OAuthMethodType } from 'security/domain';
import { OAuthMethodValidator } from '@security/domain/validation/validator';

export class OAuthMethod {
  public static create(type: OAuthMethodType): OAuthMethod {
    const oAuthMethod = new OAuthMethod(type);

    new OAuthMethodValidator(oAuthMethod).validate();

    return oAuthMethod;
  }

  constructor(private _type: OAuthMethodType) {}

  public equals(anotherOAuthMethod: OAuthMethod): boolean {
    return anotherOAuthMethod.type === this._type;
  }

  public get type(): OAuthMethodType {
    return this._type;
  }
}
