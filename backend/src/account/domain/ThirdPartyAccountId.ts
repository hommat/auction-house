import { ThirdPartyAccountIdValidator } from '@account/domain/validation/validator';

export class ThirdPartyAccountId {
  public static create(value: string): ThirdPartyAccountId {
    const thirdPartyAccountId = new ThirdPartyAccountId(value);

    new ThirdPartyAccountIdValidator(thirdPartyAccountId).validate();

    return thirdPartyAccountId;
  }

  constructor(private _value: string) {}

  public equals(anotherThirdPartyAccountId: ThirdPartyAccountId): boolean {
    return this._value === anotherThirdPartyAccountId.value;
  }

  public get value(): string {
    return this._value;
  }
}
