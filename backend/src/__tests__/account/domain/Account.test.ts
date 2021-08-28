import { Account, AccountStatus } from '@account/domain';
import {
  AccountNotDeactivatedException,
  InvalidActivationTokenException,
  InvalidChangePasswordTokenException,
} from '@account/domain/exception/account';
import {
  mockAccountId1,
  mockEmail1,
  mockLogin1,
  mockHashedPassword1,
  mockHashedPassword2,
  mockActivationToken1,
  mockActivationToken2,
  mockChangePasswordToken1,
  mockChangePasswordToken2,
} from '@mocks/account';

describe('Account', () => {
  describe('createActivated', () => {
    it('should create account with status activated', () => {
      const account = Account.createActivated(
        mockAccountId1(),
        mockEmail1(),
        mockLogin1(),
        mockHashedPassword1()
      );

      expect(account.status).toBe(AccountStatus.ACTIVATED);
    });
  });

  describe('createDeactivated', () => {
    it('should create account with status activated', () => {
      const account = Account.createDeactivated(
        mockAccountId1(),
        mockEmail1(),
        mockLogin1(),
        mockHashedPassword1(),
        mockActivationToken1()
      );

      expect(account.status).toBe(AccountStatus.DEACTIVATED);
    });
  });

  describe('activate', () => {
    it('should throw AccountNotDeactivatedException when account is not deactivated', () => {
      const account = Account.createActivated(
        mockAccountId1(),
        mockEmail1(),
        mockLogin1(),
        mockHashedPassword1()
      );

      expect(() => account.activate(mockActivationToken1())).toThrow(
        AccountNotDeactivatedException
      );
    });

    it('should throw InvalidActivationTokenException when token is not valid', () => {
      const account = Account.createDeactivated(
        mockAccountId1(),
        mockEmail1(),
        mockLogin1(),
        mockHashedPassword1(),
        mockActivationToken1()
      );

      expect(() => account.activate(mockActivationToken2())).toThrow(
        InvalidActivationTokenException
      );
    });

    it('should change account status to activated', () => {
      const account = Account.createDeactivated(
        mockAccountId1(),
        mockEmail1(),
        mockLogin1(),
        mockHashedPassword1(),
        mockActivationToken1()
      );

      account.activate(mockActivationToken1());

      expect(account.status).toBe(AccountStatus.ACTIVATED);
    });
  });

  describe('setChangePasswordToken', () => {
    it('should update token', () => {
      const account = Account.createActivated(
        mockAccountId1(),
        mockEmail1(),
        mockLogin1(),
        mockHashedPassword1()
      );

      const token = mockChangePasswordToken2();
      expect(account.changePasswordToken).not.toBe(token);

      account.setChangePasswordToken(token);
      expect(account.changePasswordToken).toBe(token);
    });
  });

  describe('changePassword', () => {
    it('should throw InvalidChangePasswordTokenException when account token is null', () => {
      const account = Account.createActivated(
        mockAccountId1(),
        mockEmail1(),
        mockLogin1(),
        mockHashedPassword1()
      );

      expect(() =>
        account.changePassword(mockChangePasswordToken1(), mockHashedPassword1())
      ).toThrow(InvalidChangePasswordTokenException);
    });

    it('should throw InvalidChangePasswordTokenException when account token is different than given token', () => {
      const account = Account.createActivated(
        mockAccountId1(),
        mockEmail1(),
        mockLogin1(),
        mockHashedPassword1()
      );

      account.setChangePasswordToken(mockChangePasswordToken1());

      expect(() =>
        account.changePassword(mockChangePasswordToken2(), mockHashedPassword1())
      ).toThrow(InvalidChangePasswordTokenException);
    });

    it('should update password and remove token', () => {
      const account = Account.createActivated(
        mockAccountId1(),
        mockEmail1(),
        mockLogin1(),
        mockHashedPassword1()
      );

      const token = mockChangePasswordToken1();
      const newPassword = mockHashedPassword2();

      account.setChangePasswordToken(mockChangePasswordToken1());
      account.changePassword(token, newPassword);

      expect(account.password.equals(newPassword));
      expect(account.changePasswordToken).toBe(null);
    });
  });
});
