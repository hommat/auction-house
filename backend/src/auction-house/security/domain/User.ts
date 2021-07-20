import { Role, UserId } from '@security/domain';

export class User {
  constructor(private _userId: UserId, private _roles: Role[]) {}

  public hasRole(role: Role): boolean {
    return this._roles.includes(role);
  }

  public get userId(): UserId {
    return this._userId.copy();
  }

  public get roles(): Role[] {
    return [...this._roles];
  }
}
