import {
  Account,
  AccountId,
  ActivationToken,
  ChangePasswordToken,
  Email,
  HashedPassword,
  Login,
} from '@account/domain';
import { Account as AccountModel } from '@account/infrastructure/repository/sequelize/model';
import { AccountAttributes } from '@account/infrastructure/repository/sequelize/model/attributes';
import { Uuid } from '@shared-kernel/domain';

export class AccountConverter {
  public static toDomain(account: AccountModel): Account {
    const { activationToken, changePasswordToken, email, id, login, password, status } = account;

    return new Account(
      new AccountId(new Uuid(id)),
      new Email(email),
      new Login(login),
      new HashedPassword(password),
      status,
      activationToken === null ? null : new ActivationToken(new Uuid(activationToken)),
      changePasswordToken === null ? null : new ChangePasswordToken(new Uuid(changePasswordToken))
    );
  }

  public static toPersist(account: Account): AccountAttributes {
    return {
      id: account.accountId.uuid.value,
      activationToken: account.activationToken && account.activationToken.uuid.value,
      changePasswordToken: account.changePasswordToken && account.changePasswordToken.uuid.value,
      email: account.email.value,
      login: account.login.value,
      password: account.password.value,
      status: account.status,
    };
  }
}
