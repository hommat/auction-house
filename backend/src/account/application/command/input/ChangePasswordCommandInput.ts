export class ChangePasswordCommandInput {
  constructor(private _changePasswordUuid: string, private _password: string) {}

  public get changePasswordTokenUuid(): string {
    return this._changePasswordUuid;
  }

  public get password(): string {
    return this._password;
  }
}
