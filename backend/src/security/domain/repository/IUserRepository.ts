import { User, UserId } from '@security/domain';

export interface IUserRepository {
  findOne(userId: UserId): User;
}
