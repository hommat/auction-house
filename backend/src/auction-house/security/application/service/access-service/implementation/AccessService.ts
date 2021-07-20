import { IAccessService } from '@security/application/service/access-service';
import { Access, Role, UserId } from '@security/domain';
import { IUserRepository } from '@security/domain/repository';

export class AccessService implements IAccessService {
  private createAuctionAccess = new Access([Role.USER]);
  private makeBidAccess = new Access([Role.USER]);

  constructor(private _userRepository: IUserRepository) {}

  public hasCreateAuctionAccess(userId: number): Promise<boolean> {
    return this.userExistsAndHasAccess(userId, this.createAuctionAccess);
  }

  public hasMakeBidAccess(userId: number): Promise<boolean> {
    return this.userExistsAndHasAccess(userId, this.makeBidAccess);
  }

  private async userExistsAndHasAccess(userId: number, access: Access): Promise<boolean> {
    try {
      const user = this._userRepository.findOne(UserId.create(userId));

      return access.isGrantedTo(user);
    } catch (e) {
      return false;
    }
  }
}
