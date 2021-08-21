export class CreateAccountCommandInput {
  constructor(private _email: string, private _login: string, private _password: string) {}

  public get email(): string {
    return this._email;
  }

  public get login(): string {
    return this._login;
  }

  public get password(): string {
    return this._password;
  }
}
