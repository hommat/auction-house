import { JwtValidator } from '@security/domain/validation/validator';

export class Jwt {
  public static create(value: string): Jwt {
    const jwt = new Jwt(value);

    new JwtValidator(jwt).validate();

    return jwt;
  }

  constructor(private _value: string) {}

  public equals(anotherJwt: Jwt): boolean {
    return anotherJwt.value === this._value;
  }

  public get value(): string {
    return this._value;
  }
}
