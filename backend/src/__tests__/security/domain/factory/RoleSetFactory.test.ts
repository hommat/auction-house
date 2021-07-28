import { Role, RoleSet } from '@security/domain';
import { RoleSetFactory } from '@security/domain/factory';

let roleSetFactory: RoleSetFactory;

beforeEach(() => {
  roleSetFactory = new RoleSetFactory();
});

describe('RoleSetFactory', () => {
  describe('createAdministrator', () => {
    let roleSet: RoleSet;

    beforeEach(() => {
      roleSet = roleSetFactory.createAdministrator();
    });

    it('should return RoleSet with admin role', () => {
      expect(roleSet.includes(Role.ADMINISTRATOR));
    });

    it('should return RoleSet with user role', () => {
      expect(roleSet.includes(Role.USER));
    });
  });

  describe('createUser', () => {
    let roleSet: RoleSet;

    beforeEach(() => {
      roleSet = roleSetFactory.createUser();
    });

    it('should return RoleSet with user role', () => {
      expect(roleSet.includes(Role.USER));
    });
  });
});
