import { AccountId } from '@account/domain';
import { mockId1, mockId2 } from '@mocks/shared-kernel';

export const mockAccountId1 = (): AccountId => AccountId.create(mockId1().value);
export const mockAccountId2 = (): AccountId => AccountId.create(mockId2().value);
