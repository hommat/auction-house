import { Account, AccountId, ActivationToken, Email, Login } from '@account/domain';

export interface IAccountSaveOptions {
  activated?: boolean;
}

export interface IAccountRepository {
  generateId(): Promise<AccountId>;

  create(account: Account): Promise<void>;

  save(account: Account): Promise<void>;

  findByActivationToken(activationToken: ActivationToken): Promise<Account | null>;
  findByLoginOrEmail(login: Login, email: Email): Promise<Account[]>;
}
