import { mockRoleSet, mockUserId1 } from '@mocks/security';
import { User } from '@security/domain';

export const mockUser = (): User => new User(mockUserId1(), mockRoleSet());
