export class RemindPasswordCommandInput {
  constructor(private _email: string) {}

  public get email(): string {
    return this._email;
  }
}
