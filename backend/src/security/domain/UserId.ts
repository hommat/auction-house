import { UserIdMinValueException } from '@security/domain/exception/user-id';
import { UserIdMinValueSpecification } from '@security/domain/specification/user-id';

export class UserId {
  public static create(value: number): UserId {
    const userId = new UserId(value);

    const userIdMinValueSpecification = new UserIdMinValueSpecification();
    if (!userIdMinValueSpecification.isSatisfiedBy(userId)) {
      throw new UserIdMinValueException();
    }

    return userId;
  }

  private constructor(private _value: number) {}

  public copy(): UserId {
    return new UserId(this._value);
  }

  public get value(): number {
    return this._value;
  }
}
