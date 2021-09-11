import { ThirdPartyAccountId } from '@account/domain';

export const mockThirdPartyAccountId1 = (): ThirdPartyAccountId =>
  ThirdPartyAccountId.create('MockThirdPartyId1');
export const mockThirdPartyAccountId2 = (): ThirdPartyAccountId =>
  ThirdPartyAccountId.create('MockThirdPartyId2');
