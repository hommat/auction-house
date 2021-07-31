import { IdMinValueException } from '@shared-kernel/domain/exception/id';
import { IdMinValueSpecification } from '@shared-kernel/domain/specification/id';

export class Id {
  public static create(value: number): Id {
    const id = new Id(value);

    const idMinValueSpecification = new IdMinValueSpecification();
    if (!idMinValueSpecification.isSatisfiedBy(id)) {
      throw new IdMinValueException();
    }

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
