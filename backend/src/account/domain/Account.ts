import {
  AccountId,
  AccountStatus,
  ActivationToken,
  Email,
  HashedPassword,
  Login,
} from '@account/domain';
import {
  AccountNotDeactivatedException,
  InvalidActivationTokenException,
} from '@account/domain/exception/account';

export class Account {
  public static createActivated(
    accountId: AccountId,
    email: Email,
    login: Login,
    password: HashedPassword
  ): Account {
    return new Account(accountId, email, login, password, AccountStatus.ACTIVATED, null);
  }

  public static createDeactivated(
    accountId: AccountId,
    email: Email,
    login: Login,
    password: HashedPassword,
    activationToken: ActivationToken
  ): Account {
    return new Account(
      accountId,
      email,
      login,
      password,
      AccountStatus.DEACTIVATED,
      activationToken
    );
  }

  private constructor(
    private _accountId: AccountId,
    private _email: Email,
    private _login: Login,
    private _password: HashedPassword,
    private _status: AccountStatus,
    private _activationToken: ActivationToken | null = null
  ) {}

  public activate(activationToken: ActivationToken): void {
    if (!this.isDeactivated) {
      throw new AccountNotDeactivatedException();
    }

    if (!this.isActivationTokenValid(activationToken)) {
      throw new InvalidActivationTokenException();
    }

    this._status = AccountStatus.ACTIVATED;
    this._activationToken = null;
  }

  private isActivationTokenValid(activationToken: ActivationToken): boolean {
    return this.hasActivationToken && this._activationToken!.equals(activationToken);
  }

  public changePassword(newPassword: HashedPassword): void {
    this._password = newPassword;
  }

  public get accountId(): AccountId {
    return this._accountId;
  }

  public get email(): Email {
    return this._email;
  }

  public get login(): Login {
    return this._login;
  }

  public get password(): HashedPassword {
    return this._password;
  }

  public get status(): AccountStatus {
    return this._status;
  }

  public get activationToken(): ActivationToken | null {
    return this._activationToken;
  }

  private get isDeactivated(): boolean {
    return this._status === AccountStatus.DEACTIVATED;
  }

  private get hasActivationToken(): boolean {
    return this.activationToken !== null;
  }
}
