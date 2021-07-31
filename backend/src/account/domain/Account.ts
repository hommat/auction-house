import { AccountId, HashedPassword, Login } from '@account/domain';

export class Account {
  constructor(
    private _accountId: AccountId,
    private _login: Login,
    private _password: HashedPassword
  ) {}

  public get accountId(): AccountId {
    return this._accountId;
  }

  public get login(): Login {
    return this._login;
  }

  public get password(): HashedPassword {
    return this._password;
  }
}
