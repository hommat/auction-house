export class SignInQueryInput {
  constructor(private _login: string, private _password: string) {}

  public get login(): string {
    return this._login;
  }

  public get password(): string {
    return this._password;
  }
}
