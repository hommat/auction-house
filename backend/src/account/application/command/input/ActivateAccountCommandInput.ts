export class ActivateAccountCommandInput {
  constructor(private _activationTokenUuid: string) {}

  public get activationTokenUuid(): string {
    return this._activationTokenUuid;
  }
}
