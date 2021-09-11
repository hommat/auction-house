export class OAuthTokensQueryOutput {
  constructor(private _accessToken: string, private _idToken: string) {}

  public get accessToken(): string {
    return this._accessToken;
  }

  public get idToken(): string {
    return this._idToken;
  }
}
