import { UuidValidator } from '@shared-kernel/domain/validation/validator';

export class Uuid {
  public static create(value: string): Uuid {
    const uuid = new Uuid(value);

    new UuidValidator(uuid).validate();

    return uuid;
  }

  public static createWithoutValidation(value: string): Uuid {
    return new Uuid(value);
  }

  protected constructor(private _value: string) {}

  public equals(anotherUuid: Uuid): boolean {
    return this._value === anotherUuid.value;
  }

  public get value(): string {
    return this._value;
  }
}
