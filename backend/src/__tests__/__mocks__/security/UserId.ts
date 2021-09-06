import { mockId1, mockId2 } from '@mocks/shared-kernel';
import { UserId } from '@security/domain';

export const mockUserId1 = (): UserId => new UserId(mockId1().uuid);
export const mockUserId2 = (): UserId => new UserId(mockId2().uuid);
