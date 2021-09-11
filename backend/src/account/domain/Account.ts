import {
  AccountId,
  AccountStatus,
  ActivationToken,
  ChangePasswordToken,
  Email,
  HashedPassword,
  Login,
  ThirdPartyAccountId,
  ThirdPartyAccountService,
} from '@account/domain';
import {
  AccountNotDeactivatedException,
  InvalidActivationTokenException,
  InvalidChangePasswordTokenException,
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

  public static createThirdParty(
    accountId: AccountId,
    email: Email,
    thirdPartyAccountId: ThirdPartyAccountId,
    thirdPartyAccountService: ThirdPartyAccountService
  ): Account {
    return new Account(
      accountId,
      email,
      null,
      null,
      AccountStatus.LOGIN_REQUIRED,
      null,
      null,
      thirdPartyAccountId,
      thirdPartyAccountService
    );
  }

  constructor(
    private _accountId: AccountId,
    private _email: Email,
    private _login: Login | null,
    private _password: HashedPassword | null,
    private _status: AccountStatus,
    private _activationToken: ActivationToken | null = null,
    private _changePasswordToken: ChangePasswordToken | null = null,
    private _thirdPartyAccountId: ThirdPartyAccountId | null = null,
    private _thirdPartyAccountService: ThirdPartyAccountService | null = null
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

  public changePassword(
    changePasswordToken: ChangePasswordToken,
    newPassword: HashedPassword
  ): void {
    if (!this.isChangePasswordTokenValid(changePasswordToken)) {
      throw new InvalidChangePasswordTokenException();
    }

    this._changePasswordToken = null;
    this._password = newPassword;
  }

  private isChangePasswordTokenValid(changePasswordToken: ChangePasswordToken): boolean {
    return this.hasChangePasswordToken && this._changePasswordToken!.equals(changePasswordToken);
  }

  public setChangePasswordToken(changePasswordToken: ChangePasswordToken): void {
    this._changePasswordToken = changePasswordToken;
  }

  public get accountId(): AccountId {
    return this._accountId;
  }

  public get email(): Email {
    return this._email;
  }

  public get login(): Login | null {
    return this._login;
  }

  public get password(): HashedPassword | null {
    return this._password;
  }

  public get status(): AccountStatus {
    return this._status;
  }

  public get activationToken(): ActivationToken | null {
    return this._activationToken;
  }

  public get changePasswordToken(): ChangePasswordToken | null {
    return this._changePasswordToken;
  }

  public get thirdPartyAccountId(): ThirdPartyAccountId | null {
    return this._thirdPartyAccountId;
  }

  public get thirdPartyAccountService(): ThirdPartyAccountService | null {
    return this._thirdPartyAccountService;
  }

  private get isDeactivated(): boolean {
    return this._status === AccountStatus.DEACTIVATED;
  }

  private get hasActivationToken(): boolean {
    return this._activationToken !== null;
  }

  private get hasChangePasswordToken(): boolean {
    return this._changePasswordToken !== null;
  }
}
