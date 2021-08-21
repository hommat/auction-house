export class SignInQueryOutput {
  constructor(private _jwt: string) {}

  public get jwt(): string {
    return this._jwt;
  }
}
