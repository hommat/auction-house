import { Role, User } from '@security/domain';
import { mockRoleSet, mockUserId1 } from '@mocks/security';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('User', () => {
  describe('hasRole', () => {
    it('should return true when user role set includes role', () => {
      const roleSet = mockRoleSet();
      const spy = jest.spyOn(roleSet, 'includes').mockImplementation(() => true);

      const user = new User(mockUserId1(), roleSet);

      expect(user.hasRole(Role.ADMINISTRATOR)).toBe(true);
      expect(spy.mock.calls.length).toBe(1);
      expect(spy.mock.calls[0][0]).toBe(Role.ADMINISTRATOR);
    });

    it('should return false when user role set does not include role', () => {
      const roleSet = mockRoleSet();
      const spy = jest.spyOn(roleSet, 'includes').mockImplementation(() => false);

      const user = new User(mockUserId1(), roleSet);

      expect(user.hasRole(Role.ADMINISTRATOR)).toBe(false);
      expect(spy.mock.calls.length).toBe(1);
      expect(spy.mock.calls[0][0]).toBe(Role.ADMINISTRATOR);
    });
  });
});
