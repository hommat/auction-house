import { Role, RoleSet } from '@security/domain';

export class RoleSetFactory {
  public createAdministrator(): RoleSet {
    const roles = [Role.ADMINISTRATOR];
    const roleSets = [this.createUser()];

    return new RoleSet(roles, roleSets);
  }

  public createUser(): RoleSet {
    const roles = [Role.USER];

    return new RoleSet(roles);
  }
}
