export class Command {
  constructor(private _isAsync: boolean = false) {}

  public get isAsync(): boolean {
    return this._isAsync;
  }

  public get name(): string {
    return this.constructor.name;
  }
}
