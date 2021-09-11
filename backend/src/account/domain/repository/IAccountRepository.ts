import { Account, ActivationToken, ChangePasswordToken, Email, Login } from '@account/domain';

export interface IAccountRepository {
  create(account: Account): Promise<void>;

  save(account: Account): Promise<void>;

  findByActivationToken(activationToken: ActivationToken): Promise<Account | null>;
  findByChangePasswordToken(changePasswordToken: ChangePasswordToken): Promise<Account | null>;
  findByEmail(email: Email): Promise<Account | null>;
  findByLoginOrEmail(login: Login, email: Email): Promise<Account[]>;
}
