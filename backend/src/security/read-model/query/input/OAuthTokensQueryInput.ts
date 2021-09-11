export class OAuthTokensQueryInput {
  constructor(private _authorizationCode: string, private _method: string) {}

  public get authorizationCode(): string {
    return this._authorizationCode;
  }

  public get method(): string {
    return this._method;
  }
}
