import { Account, AccountId, Login } from '@account/domain';

export interface IAccountRepository {
  create(account: Account): Promise<void>;
  generateId(): Promise<AccountId>;
  isLoginAlreadyInUse(login: Login): Promise<boolean>;
}
