import { Account, AccountId, ActivationToken, Email, Login } from '@account/domain';
import { Uuid } from '@shared-kernel/domain';

export interface IAccountSaveOptions {
  activated?: boolean;
}

export interface IAccountRepository {
  generateId(): Promise<AccountId>;

  create(account: Account): Promise<void>;

  save(account: Account): Promise<void>;
  saveAndDestroyChangePasswordToken(account: Account): Promise<void>;

  findByActivationToken(activationToken: ActivationToken): Promise<Account | null>;
  findByChangePasswordTokenUuid(changePasswordTokenUuid: Uuid): Promise<Account | null>;
  findByLoginOrEmail(login: Login, email: Email): Promise<Account[]>;
  findByEmail(email: Email): Promise<Account | null>;
}
