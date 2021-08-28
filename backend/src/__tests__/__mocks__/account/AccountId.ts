import { AccountId } from '@account/domain';
import { mockId1, mockId2 } from '@mocks/shared-kernel';

export const mockAccountId1 = (): AccountId => new AccountId(mockId1().uuid);
export const mockAccountId2 = (): AccountId => new AccountId(mockId2().uuid);
