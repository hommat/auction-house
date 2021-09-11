export class OAuthAuthorizationCode {
  constructor(private _value: string) {}

  public equals(anotherOAuthAuthorizationCode: OAuthAuthorizationCode): boolean {
    return this._value === anotherOAuthAuthorizationCode.value;
  }

  public get value(): string {
    return this._value;
  }
}
