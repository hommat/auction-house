import { Role, RoleSet, UserId } from '@security/domain';

export class User {
  constructor(private _userId: UserId, private _roleSet: RoleSet) {}

  public hasRole(role: Role): boolean {
    return this._roleSet.includes(role);
  }

  public get userId(): UserId {
    return this._userId.copy();
  }
}
