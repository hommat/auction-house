import { IAccessService } from '@security/application/service/access-service';
import { Access, Role, UserId } from '@security/domain';
import { IUserRepository } from '@security/domain/repository';
import { Uuid } from '@shared-kernel/domain';

export class AccessService implements IAccessService {
  constructor(private _userRepository: IUserRepository) {}

  public hasCreateAuctionAccess(userId: string): Promise<boolean> {
    const createAuctionAccess = new Access([Role.USER]);

    return this.userExistsAndHasAccess(userId, createAuctionAccess);
  }

  public hasMakeBidAccess(userId: string): Promise<boolean> {
    const makeBidAccess = new Access([Role.USER]);

    return this.userExistsAndHasAccess(userId, makeBidAccess);
  }

  private async userExistsAndHasAccess(userId: string, access: Access): Promise<boolean> {
    try {
      const user = await this._userRepository.findOne(new UserId(Uuid.create(userId)));

      return access.isGrantedTo(user);
    } catch (e) {
      return false;
    }
  }
}
