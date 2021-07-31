import { AccountId } from '@account/domain';
import { mockId } from '@mocks/shared-kernel';

export const mockAccountId1 = (): AccountId => AccountId.create(mockId().value);
