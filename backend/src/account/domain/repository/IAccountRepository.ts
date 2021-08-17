import { Account, AccountId, Email, Login } from '@account/domain';

export interface IAccountRepository {
  create(account: Account): Promise<void>;
  generateId(): Promise<AccountId>;
  findWithLoginOrEmail(login: Login, email: Email): Promise<Account[]>;
}
