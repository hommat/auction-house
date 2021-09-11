import { ThirdPartyAccountService, ThirdPartyAccountServiceType } from '@account/domain';

export const mockThirdPartyAccountService1 = (): ThirdPartyAccountService =>
  ThirdPartyAccountService.create(ThirdPartyAccountServiceType.GOOGLE);
