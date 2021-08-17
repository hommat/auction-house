import { mockId1 } from '@mocks/shared-kernel';
import { UserId } from '@security/domain';

export const mockUserId = (): UserId => UserId.create(mockId1().value);
