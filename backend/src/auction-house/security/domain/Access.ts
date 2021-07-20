import { Role, User } from '@security/domain';

export class Access {
  constructor(private _requiredRoles: Role[]) {}

  public isGrantedTo(user: User): boolean {
    const hasUserRole = user.hasRole.bind(user);

    return this._requiredRoles.every(hasUserRole);
  }
}
