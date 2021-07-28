import { Role } from '@security/domain';

export class RoleSet {
  constructor(private _roles: Role[] = [], private _roleSets: RoleSet[] = []) {}

  public includes(role: Role): boolean {
    if (this._roles.includes(role)) {
      return true;
    }

    return this._roleSets.some((roleSet) => roleSet.includes(role));
  }
}
