import { mockUser } from '@mocks/security';
import { Access, Role } from '@security/domain';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Access', () => {
  describe('isGrantedTo', () => {
    it('should return true when user has every required role', () => {
      const access = new Access([Role.ADMINISTRATOR, Role.USER]);
      const user = mockUser();
      const spy = jest.spyOn(user, 'hasRole').mockImplementation(() => true);

      expect(access.isGrantedTo(user)).toBe(true);
      expect(spy.mock.calls.length).toBe(2);
    });

    it('should return false when user has not every required role', () => {
      const access = new Access([Role.ADMINISTRATOR, Role.USER]);
      const user = mockUser();
      const spy = jest.spyOn(user, 'hasRole').mockImplementation(() => false);

      expect(access.isGrantedTo(user)).toBe(false);
      expect(spy.mock.calls.length).toBe(1);
    });
  });
});
