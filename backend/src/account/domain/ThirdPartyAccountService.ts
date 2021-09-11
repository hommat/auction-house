import { ThirdPartyAccountServiceType } from '@account/domain';
import { ThirdPartyAccountServiceValidator } from '@account/domain/validation/validator';

export class ThirdPartyAccountService {
  public static create(type: ThirdPartyAccountServiceType): ThirdPartyAccountService {
    const thirdPartyAccountService = new ThirdPartyAccountService(type);

    new ThirdPartyAccountServiceValidator(thirdPartyAccountService).validate();

    return thirdPartyAccountService;
  }

  constructor(private _type: ThirdPartyAccountServiceType) {}

  public equals(anotherThirdPartyAccountService: ThirdPartyAccountService): boolean {
    return this._type === anotherThirdPartyAccountService.type;
  }

  public get type(): ThirdPartyAccountServiceType {
    return this._type;
  }
}
