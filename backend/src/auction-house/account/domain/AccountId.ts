import { AccountIdMinValueException } from '@account/domain/exception/account-id';
import { AccountIdMinValueSpecification } from '@account/domain/specification/account-id';

export class AccountId {
  public static create(value: number): AccountId {
    const accountId = new AccountId(value);

    const accountIdMinValueSpecification = new AccountIdMinValueSpecification();
    if (!accountIdMinValueSpecification.isSatisfiedBy(accountId)) {
      throw new AccountIdMinValueException();
    }

    return accountId;
  }

  private constructor(private _value: number) {}

  public copy(): AccountId {
    return new AccountId(this._value);
  }

  public get value(): number {
    return this._value;
  }
}
