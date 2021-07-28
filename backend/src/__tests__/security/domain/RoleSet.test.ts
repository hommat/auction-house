import { Role, RoleSet } from '@security/domain';

describe('RoleSet', () => {
  describe('includes', () => {
    it('should return true when Role array includes role', () => {
      const roleSet = new RoleSet([Role.ADMINISTRATOR], []);

      expect(roleSet.includes(Role.ADMINISTRATOR)).toBe(true);
    });

    it('should return true when RoleSet array includes role', () => {
      const nestedRoleSet = new RoleSet([Role.ADMINISTRATOR], []);
      const roleSet = new RoleSet([], [nestedRoleSet]);

      expect(roleSet.includes(Role.ADMINISTRATOR)).toBe(true);
    });

    it('should return false when Role and RoleSet arrays do not include role', () => {
      const roleSet = new RoleSet([Role.USER], [new RoleSet([Role.USER])]);

      expect(roleSet.includes(Role.ADMINISTRATOR)).toBe(false);
    });
  });
});
