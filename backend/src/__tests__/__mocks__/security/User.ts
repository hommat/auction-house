import { mockRoleSet, mockUserId } from '@mocks/security';
import { User } from '@security/domain';

export const mockUser = (): User => new User(mockUserId(), mockRoleSet());
