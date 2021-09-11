export class OAuthLinkQueryOutput {
  constructor(private _link: string) {}

  public get link(): string {
    return this._link;
  }
}
