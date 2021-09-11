export class OAuthLinkQueryInput {
  constructor(private _method: string) {}

  public get method(): string {
    return this._method;
  }
}
