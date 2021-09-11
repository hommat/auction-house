export class CreateThirdPartyAccountCommandInput {
  constructor(
    private _email: string,
    private _thirdPartyAccountId: string,
    private _thirdPartyAccountServiceType: string
  ) {}

  public get email(): string {
    return this._email;
  }

  public get thirdPartyAccountId(): string {
    return this._thirdPartyAccountId;
  }

  public get thirdPartyAccountService(): string {
    return this._thirdPartyAccountServiceType;
  }
}
