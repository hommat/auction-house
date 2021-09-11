import { ThirdPartyAccountId } from '@account/domain';
import {
  ThirdPartyAccountIdDataTypeSpecification,
  ThirdPartyAccountIdMinLengthSpecification,
} from '@account/domain/specification/third-party-account-id';
import { ValidationField } from '@account/domain/validation';
import { ValueObjectValidator, Validator } from '@shared-kernel/validation';

export class ThirdPartyAccountIdValidator extends ValueObjectValidator<ThirdPartyAccountId> {
  protected _validator = new Validator(
    ValidationField.THIRD_PARTY_ACCOUNT_ID,
    this._thirdPartyAccountId
  );
  protected _specifications = [
    new ThirdPartyAccountIdDataTypeSpecification(),
    new ThirdPartyAccountIdMinLengthSpecification(),
  ];

  constructor(private _thirdPartyAccountId: ThirdPartyAccountId) {
    super();
  }
}
