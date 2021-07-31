export class HashedPassword {
  constructor(private _value: string) {}

  public equals(anotherHashedPassword: HashedPassword): boolean {
    return this._value === anotherHashedPassword.value;
  }

  public get value(): string {
    return this._value;
  }
}
