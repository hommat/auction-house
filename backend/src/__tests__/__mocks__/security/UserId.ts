import { mockId1 } from '@mocks/shared-kernel';
import { UserId } from '@security/domain';

export const mockUserId = (): UserId => new UserId(mockId1().uuid);
