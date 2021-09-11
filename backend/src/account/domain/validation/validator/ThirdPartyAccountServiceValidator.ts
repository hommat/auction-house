import { ThirdPartyAccountService } from '@account/domain';
import {
  ThirdPartyAccountServiceDataTypeSpecification,
  ThirdPartyAccountServiceValueSpecification,
} from '@account/domain/specification/third-party-account-service';
import { ValidationField } from '@account/domain/validation';
import { ValueObjectValidator, Validator } from '@shared-kernel/validation';

export class ThirdPartyAccountServiceValidator extends ValueObjectValidator<ThirdPartyAccountService> {
  protected _validator = new Validator(
    ValidationField.THIRD_PARTY_ACCOUNT_SERVICE,
    this._thirdPartyAccountService
  );
  protected _specifications = [
    new ThirdPartyAccountServiceDataTypeSpecification(),
    new ThirdPartyAccountServiceValueSpecification(),
  ];

  constructor(private _thirdPartyAccountService: ThirdPartyAccountService) {
    super();
  }
}
