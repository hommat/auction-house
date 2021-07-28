export class HashedPassword {
  constructor(private _value: string) {}

  public copy(): HashedPassword {
    return new HashedPassword(this._value);
  }

  public get value(): string {
    return this._value;
  }
}
