import { mockUserId } from '@mocks/security';
import { AccessService } from '@security/application/service/access-service/implementation';
import { Role, User, RoleSet } from '@security/domain';
import { IUserRepository } from '@security/domain/repository';

const createAccessService = (userExists: boolean, userRoles: Role[]): AccessService => {
  const userRepo: IUserRepository = {
    findOne: () => {
      if (!userExists) {
        throw Error();
      }

      return Promise.resolve(new User(mockUserId(), new RoleSet(userRoles)));
    },
  };

  return new AccessService(userRepo);
};

describe('AccessService', () => {
  describe('hasCreateAuctionAccess', () => {
    it('should return false when user does not exist', async () => {
      const accessService = createAccessService(false, [Role.USER]);

      expect(await accessService.hasCreateAuctionAccess(1)).toBe(false);
    });

    it('should return false when user does not have user role', async () => {
      const accessService = createAccessService(true, []);

      expect(await accessService.hasCreateAuctionAccess(1)).toBe(false);
    });

    it('should return true when user exists and has user role', async () => {
      const accessService = createAccessService(true, [Role.USER]);

      expect(await accessService.hasCreateAuctionAccess(1)).toBe(true);
    });
  });

  describe('hasMakeBidAccess', () => {
    it('should return false when user does not exist', async () => {
      const accessService = createAccessService(false, [Role.USER]);

      expect(await accessService.hasMakeBidAccess(1)).toBe(false);
    });

    it('should return false when user does not have user role', async () => {
      const accessService = createAccessService(true, []);

      expect(await accessService.hasMakeBidAccess(1)).toBe(false);
    });

    it('should return true when user exists and has user role', async () => {
      const accessService = createAccessService(true, [Role.USER]);

      expect(await accessService.hasMakeBidAccess(1)).toBe(true);
    });
  });
});
