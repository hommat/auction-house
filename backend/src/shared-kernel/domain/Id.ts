import { IdValidator } from '@shared-kernel/domain/validation/validator';

export class Id {
  public static create(value: number): Id {
    const id = new Id(value);

    new IdValidator(id).validate();

    return id;
  }

  protected constructor(private _value: number) {}

  public equals(anotherId: Id): boolean {
    return this._value === anotherId.value;
  }

  public get value(): number {
    return this._value;
  }
}
